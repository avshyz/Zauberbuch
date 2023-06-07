import {
	BaseDirectory,
	readDir,
	writeTextFile,
	type FileEntry,
	readTextFile
} from '@tauri-apps/api/fs';
import type { CharacterSheet } from '../types';
import { v4 as uuid } from 'uuid';

export async function saveCharacter(sheet: CharacterSheet) {
	return writeTextFile(`characters/${uuid()}`, JSON.stringify(sheet), {
		dir: BaseDirectory.AppConfig
	});
}

export async function loadCharacter(id: string) {
	const characterData = await readTextFile(`characters/${id}`, {
		dir: BaseDirectory.AppConfig
	});
	return JSON.parse(characterData) as CharacterSheet;
}

export async function listCharacters() {
	const entries = await readDir('characters', { dir: BaseDirectory.AppConfig });
	const res = await Promise.all(entries.map(normalizeEntry));

	return res
		.filter((entry): entry is [string, CharacterSheet] => !!entry[0] && !!entry[1])
		.map(([fileName, data]) => ({ id: fileName, name: data.name }));
}

async function normalizeEntry(entry: FileEntry) {
	const res = await readTextFile(entry.path, { dir: BaseDirectory.AppConfig });
	return [entry.name, JSON.parse(res) as CharacterSheet];
}
