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
import { CASTER_TYPE_TO_SLOT_TABLE } from '$lib/spellSlots';
import spells from '$lib/assets/SrdSpells';

const SPELL_LIST_MAPPER: { [key in CharacterClass]?: CharacterClass } = {
	rogue: 'wizard',
	fighter: 'wizard'
};

const EMPTY_SHEET: CharacterSheet = {
	characterClass: 'fighter',
	learnedSpells: [],
	level: 1,
	name: ''
};
function createCharacterStore() {
	const store = writable<CharacterSheet>(EMPTY_SHEET);
	const derivedStore = derived(store, ($character) => {
		const availableSpellSlots =
			CASTER_TYPE_TO_SLOT_TABLE[$character.characterClass]?.[$character.level - 1];
		const maxAvailableSpellLevel = availableSpellSlots?.findLastIndex((slot) => slot > 0) ?? 0;
		return {
			...$character,
			proficiencyBonus: Math.floor(2 + ($character.level - 1) / 4),
			availableSpellSlots,
			maxAvailableSpellLevel,
			isSpellLearned: (spell: string) => $character.learnedSpells.includes(spell),
			availableSpells: spells
				.filter(
					({ level, classes }) =>
						classes.includes(
							SPELL_LIST_MAPPER[$character.characterClass] ?? $character.characterClass
						) && level <= maxAvailableSpellLevel
				)
				.sort((a, b) => a.name.localeCompare(b.name))
				.sort((a, b) => a.level - b.level)
		};
	});

	const { set, update } = store;

	return {
		subscribe: derivedStore.subscribe,
		update,
		actions: {
			async listAllCharacters() {
				const entries = await readDir('characters', { dir: BaseDirectory.AppConfig });
				const res = await Promise.all(entries.map(normalizeEntry));

				return res
					.filter((entry): entry is [string, CharacterSheet] => !!entry[0] && !!entry[1])
					.map(([fileName, data]) => ({ id: fileName, name: data.name }));
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
				set(res);
			},
			toggleLearnSpell(spell: string) {
				update((sheet) => {
					const learnedSpells = sheet.learnedSpells;

					if (learnedSpells.includes(spell)) {
						return {
							...sheet,
							learnedSpells: learnedSpells.filter((learnedSpell) => learnedSpell !== spell)
						};
					} else {
						return {
							...sheet,
							learnedSpells: [...learnedSpells, spell]
						};
					}
				});
			}
		}
	};
}

export const characterSheet = createCharacterStore();

export async function saveCharacter(sheet: CharacterSheet, id?: string) {
	return writeTextFile(`characters/${id ?? uuid()}`, JSON.stringify(sheet), {
		dir: BaseDirectory.AppConfig
	});
}

async function normalizeEntry(entry: FileEntry) {
	const res = await readTextFile(entry.path, { dir: BaseDirectory.AppConfig });
	return [entry.name, JSON.parse(res) as CharacterSheet];
}
