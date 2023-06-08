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

export async function saveCharacter(sheet: CharacterSheet, id?: string) {
	return writeTextFile(`characters/${id ?? uuid()}`, JSON.stringify(sheet), {
		dir: BaseDirectory.AppConfig
	});
}

async function normalizeEntry(entry: FileEntry) {
	const res = await readTextFile(entry.path, { dir: BaseDirectory.AppConfig });
	return [entry.name, JSON.parse(res) as CharacterSheet];
}

const EMPTY_SHEET: CharacterSheet = {
	characterClass: 'fighter',
	learnedSpells: [],
	level: 1,
	name: ''
};
function createCharacterStore() {
	const { subscribe, set, update } = writable<CharacterSheet>(EMPTY_SHEET);

	return {
		subscribe,
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
	};
}

export const characterSheet = createCharacterStore();

export const proficiencyBonus = derived(characterSheet, ($character) =>
	Math.floor(2 + ($character.level - 1) / 4)
);

export const availableSpellSlots = derived(
	characterSheet,
	($character) => CASTER_TYPE_TO_SLOT_TABLE[$character.characterClass]?.[$character.level - 1]
);

export const maxAvailableSpellLevel = derived(
	availableSpellSlots,
	($slots) => $slots?.findLastIndex((slot) => slot > 0) ?? 0
);

export const isSpellLearned = derived(characterSheet, ($character) => {
	return (spell: string) => $character.learnedSpells.includes(spell);
});

export const availableSpells = derived(
	[characterSheet, maxAvailableSpellLevel],
	([$character, $maxLevel]) =>
		spells
			.filter(
				({ level, classes }) =>
					classes.includes(
						SPELL_LIST_MAPPER[$character.characterClass] ?? $character.characterClass
					) && level <= $maxLevel
			)
			.sort((a, b) => a.name.localeCompare(b.name))
			.sort((a, b) => a.level - b.level)
);
