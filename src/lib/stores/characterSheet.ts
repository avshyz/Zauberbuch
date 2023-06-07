import spells from '$lib/assets/SrdSpells';
import { CASTER_TYPE_TO_SLOT_TABLE } from '$lib/spellSlots';
import type { CharacterClass, CharacterSheet } from '$lib/types';
import { BaseDirectory, readDir, readTextFile, type FileEntry } from '@tauri-apps/api/fs';
import { derived, writable } from 'svelte/store';

export const character = createCharacterStore();
export const spellSlots = derived(character, (c) => {
	return getCharacterSpellSlots(c);
});
export const availableSpells = derived(character, (c) => {
	return spells
		.filter(
			({ level, classes }) =>
				classes.includes(SPELL_LIST_MAPPER[c.characterClass] ?? c.characterClass) &&
				level <= getCharacterMaxSpellLevel(c)
		)
		.sort((a, b) => a.name.localeCompare(b.name))
		.sort((a, b) => a.level - b.level);
});

const SPELL_LIST_MAPPER: { [key in CharacterClass]?: CharacterClass } = {
	rogue: 'wizard',
	fighter: 'wizard'
};

function createCharacterStore() {
	const { subscribe, set, update } = writable<CharacterSheet>({
		characterClass: 'fighter',
		name: '',
		level: 1
	});

	return {
		subscribe,
		load: async (characterId: string) => {
			const characterData = await readTextFile(`characters/${characterId}`, {
				dir: BaseDirectory.AppConfig
			});
			const character = JSON.parse(characterData) as CharacterSheet;

			set(character);
		},
		getAllCharacters: async () => {
			const entries = await readDir('characters', { dir: BaseDirectory.AppConfig });
			const res = await Promise.all(entries.map(normalizeEntry));
			return res
				.filter((entry): entry is [string, CharacterSheet] => !!entry[0] && !!entry[1])
				.map(([fileName, data]) => ({ id: fileName, name: data.name }));
		}
	};
}

async function normalizeEntry(entry: FileEntry) {
	const res = await readTextFile(entry.path, { dir: BaseDirectory.AppConfig });
	return [entry.name, JSON.parse(res)];
}

function getCharacterSpellSlots(character: CharacterSheet) {
	return CASTER_TYPE_TO_SLOT_TABLE[character.characterClass]?.[character.level - 1];
}

function getCharacterMaxSpellLevel(character: CharacterSheet) {
	return getCharacterSpellSlots(character)?.findLastIndex((slots) => slots > 0) ?? 0;
}
