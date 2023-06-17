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
import {
	NO_SPELL_SLOTS,
	getSpellSlots,
	type SpellSlots,
	bothPrepareAndLearnStages
} from '$lib/mechanics';
import spells, { type Spell } from '$lib/assets/SrdSpells';

const SPELL_LIST_MAPPER: { [key in CharacterClass]?: CharacterClass } = {
	rogue: 'wizard',
	fighter: 'wizard'
};

type CharacterStoreData = CharacterSheet & { id: string };

export const EMPTY_SHEET: CharacterStoreData = {
	characterClass: 'fighter',
	learnedSpellsIds: [],
	preparedSpellsIds: [],
	spellCastingAbility: 0,
	spellSlots: NO_SPELL_SLOTS,
	level: 1,
	name: '',
	id: '',
	currentConcentration: undefined
};

// TODO SHOULD THIS BE A CLASS??
function createCharacterStore() {
	const store = writable<CharacterStoreData>(EMPTY_SHEET);
	const { set, update } = store;
	const derivedStore = derived(store, ($character) => {
		const availableSpellSlots = getSpellSlots($character.characterClass, $character.level);
		const maxAvailableSpellLevel = availableSpellSlots
			? availableSpellSlots.findLastIndex((slot) => slot > 0) + 1
			: 0;

		const learnedSpells = spells
			.filter(({ name }) => $character.learnedSpellsIds.includes(name))
			.sort(spellComperator);

		const preparedSpells = spells
			.filter(({ name }) => $character.preparedSpellsIds.includes(name))
			.sort(spellComperator);

		return {
			...$character,
			proficiencyBonus: Math.floor(2 + ($character.level - 1) / 4),
			availableSpellSlots,
			maxAvailableSpellLevel,

			isSpellLearned: (spell: string) => $character.learnedSpellsIds.includes(spell),
			learnedSpells,

			isSpellPrepared: (spell: string) => $character.preparedSpellsIds.includes(spell),
			preparedSpells,

			playableSpells: bothPrepareAndLearnStages($character.characterClass)
				? [
						...new Set([
							...learnedSpells.filter((s) => s.level === 0 || s.ritual),
							...preparedSpells
						])
				  ]
				: learnedSpells,

			learnableSpells: spells
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
			// TODO DRY LEARN & PREPARE
			toggleLearnSpell(spell: string) {
				persistentUpdate((sheet) => {
					const learnedSpells = sheet.learnedSpellsIds;

					if (learnedSpells.includes(spell)) {
						return {
							...sheet,
							learnedSpellsIds: learnedSpells.filter((s) => s !== spell),
							// if a spell is unlearned - it's also unprepared
							preparedSpellsIds: sheet.preparedSpellsIds.filter((s) => s !== spell)
						};
					} else {
						return {
							...sheet,
							learnedSpellsIds: [...learnedSpells, spell]
						};
					}
				});
			},
			togglePrepareSpell(spell: string) {
				persistentUpdate((sheet) => {
					const preparedSpells = sheet.preparedSpellsIds;

					if (preparedSpells.includes(spell)) {
						return {
							...sheet,
							preparedSpellsIds: preparedSpells.filter((s) => s !== spell)
						};
					} else {
						return {
							...sheet,
							preparedSpellsIds: [...preparedSpells, spell]
						};
					}
				});
			},
			castSpell(spell: Spell) {
				persistentUpdate(({ currentConcentration, spellSlots, ...sheet }) => {
					const newSlots: SpellSlots = [...spellSlots];
					if (spell.level > 0 && newSlots[spell.level - 1] > 0) {
						newSlots[spell.level - 1] -= 1;
					}

					if (spell.concentration) {
						currentConcentration = spell.name;
					}
					return { ...sheet, spellSlots: newSlots, currentConcentration };
				});
			},
			breakConcentration() {
				persistentUpdate((sheet) => {
					return { ...sheet, currentConcentration: undefined };
				});
			},
			regainSlot(level: number) {
				if (level === 0) return;

				persistentUpdate((sheet) => {
					const newSlots: SpellSlots = [...sheet.spellSlots];
					const max = getSpellSlots(sheet.characterClass, sheet.level)[level - 1];

					if (newSlots[level - 1] < max) newSlots[level - 1] += 1;
					console.log('xxxx');
					return { ...sheet, spellSlots: newSlots };
				});
			},
			rest() {
				persistentUpdate((sheet) => ({
					...sheet,
					spellSlots: getSpellSlots(sheet.characterClass, sheet.level),
					// TODO DRY
					currentConcentration: undefined
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
