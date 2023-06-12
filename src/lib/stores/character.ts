import {
	BaseDirectory,
	readDir,
	writeTextFile,
	type FileEntry,
	readTextFile,
	removeFile
} from '@tauri-apps/api/fs';
import type { CharacterClass, CharacterSheet } from '../types';
import { v4 as uuid } from 'uuid';
import { derived, writable } from 'svelte/store';
import { NO_SPELL_SLOTS, getSpellSlots, type SpellSlots } from '$lib/spellSlots';
import spells, { type Spell } from '$lib/assets/SrdSpells';

const SPELL_LIST_MAPPER: { [key in CharacterClass]?: CharacterClass } = {
	rogue: 'wizard',
	fighter: 'wizard'
};

type CharacterStoreData = CharacterSheet & { id: string };

const EMPTY_SHEET: CharacterStoreData = {
	characterClass: 'fighter',
	learnedSpellsIds: [],
	spellSlots: NO_SPELL_SLOTS,
	level: 1,
	name: '',
	id: ''
};
function createCharacterStore() {
	const store = writable<CharacterStoreData>(EMPTY_SHEET);
	const { set, update } = store;
	const derivedStore = derived(store, ($character) => {
		const availableSpellSlots = getSpellSlots($character.characterClass, $character.level);
		const maxAvailableSpellLevel = availableSpellSlots?.findLastIndex((slot) => slot > 0) ?? 0;
		return {
			...$character,
			proficiencyBonus: Math.floor(2 + ($character.level - 1) / 4),
			availableSpellSlots,
			maxAvailableSpellLevel,
			isSpellLearned: (spell: string) => $character.learnedSpellsIds.includes(spell),
			learnedSpells: spells
				.filter(({ name }) => $character.learnedSpellsIds.includes(name))
				.sort(spellComperator),
			availableSpells: spells
				.filter(
					({ level, classes }) =>
						classes.includes(
							SPELL_LIST_MAPPER[$character.characterClass] ?? $character.characterClass
						) && level <= maxAvailableSpellLevel
				)
				.sort(spellComperator)
		};
	});

	function persistentUpdate(fn: (sheet: CharacterStoreData) => CharacterStoreData) {
		update((sheet) => {
			const res = fn(sheet);
			const { id, ...character } = res;
			saveCharacter(character, id);
			return res;
		});
	}

	return {
		subscribe: derivedStore.subscribe,
		update: persistentUpdate,
		actions: {
			async listAllCharacters() {
				const entries = await readDir('characters', { dir: BaseDirectory.AppConfig });
				const res = await Promise.all(entries.map(normalizeEntry));

				return res
					.filter((entry): entry is [string, CharacterSheet] => !!entry[0] && !!entry[1])
					.map(([fileName, data]) => ({
						id: fileName,
						name: data.name,
						characterClass: data.characterClass,
						level: data.level
					}));
			},
			async delete(id: string) {
				await removeFile(`characters/${id}`, {
					dir: BaseDirectory.AppConfig
				});
				set(EMPTY_SHEET);
			},
			async load(id: string) {
				const characterData = await readTextFile(`characters/${id}`, {
					dir: BaseDirectory.AppConfig
				});
				const res = JSON.parse(characterData) as CharacterSheet;
				set({ ...res, id });
			},
			toggleLearnSpell(spell: string) {
				persistentUpdate((sheet) => {
					const learnedSpells = sheet.learnedSpellsIds;

					if (learnedSpells.includes(spell)) {
						return {
							...sheet,
							learnedSpellsIds: learnedSpells.filter((learnedSpell) => learnedSpell !== spell)
						};
					} else {
						return {
							...sheet,
							learnedSpellsIds: [...learnedSpells, spell]
						};
					}
				});
			},
			castSpell(spell: Spell) {
				persistentUpdate((sheet) => {
					const newSlots: SpellSlots = [...sheet.spellSlots];
          if (spell.level > 0) newSlots[spell.level - 1] -= 1;
					return { ...sheet, spellSlots: newSlots };
				});
			},
			rest() {
				persistentUpdate((sheet) => ({
					...sheet,
					spellSlots: getSpellSlots(sheet.characterClass, sheet.level)
				}));
			}
		}
	};
}

export const characterSheet = createCharacterStore();

export async function saveCharacter(sheet: CharacterSheet, id?: string) {
	const characterId = id ?? uuid();
	await writeTextFile(`characters/${characterId}`, JSON.stringify(sheet), {
		dir: BaseDirectory.AppConfig
	});
	return characterId;
}

async function normalizeEntry(entry: FileEntry) {
	const res = await readTextFile(entry.path, { dir: BaseDirectory.AppConfig });
	return [entry.name, JSON.parse(res) as CharacterSheet];
}

function spellComperator(a: Spell, b: Spell) {
	if (a.level === b.level) {
		return a.name.localeCompare(b.name);
	}
	return a.level - b.level;
}
