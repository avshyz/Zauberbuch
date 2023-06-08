import {
	BaseDirectory,
	readDir,
	writeTextFile,
	type FileEntry,
	readTextFile,
	removeFile
} from '@tauri-apps/api/fs';
import type { CharacterSheet } from '../types';
import { v4 as uuid } from 'uuid';

export async function saveCharacter(sheet: CharacterSheet, id?: string) {
	return writeTextFile(`characters/${id ?? uuid()}`, JSON.stringify(sheet), {
		dir: BaseDirectory.AppConfig
	});
}

export async function loadCharacter(id: string) {
	const characterData = await readTextFile(`characters/${id}`, {
		dir: BaseDirectory.AppConfig
	});
	const res = JSON.parse(characterData) as CharacterSheet;
	return new Proxy(res, {
		set: (target: CharacterSheet, prop: keyof CharacterSheet, val: any) => {
			const res = Reflect.set(target, prop, val);
			saveCharacter(target, id);
			return res;
		}
	});
}

export async function listCharacters() {
	const entries = await readDir('characters', { dir: BaseDirectory.AppConfig });
	const res = await Promise.all(entries.map(normalizeEntry));

	return res
		.filter((entry): entry is [string, CharacterSheet] => !!entry[0] && !!entry[1])
		.map(([fileName, data]) => ({ id: fileName, name: data.name }));
}

export async function deleteCharacter(id: string) {
	await removeFile(`characters/${id}`, {
		dir: BaseDirectory.AppConfig
	});
}

async function normalizeEntry(entry: FileEntry) {
	const res = await readTextFile(entry.path, { dir: BaseDirectory.AppConfig });
	return [entry.name, JSON.parse(res) as CharacterSheet];
}
