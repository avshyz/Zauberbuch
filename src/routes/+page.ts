import type { CharacterSheet } from '$lib/types';
import type { PageLoad } from './$types';
import { readTextFile, readDir, BaseDirectory, type FileEntry } from '@tauri-apps/api/fs';

export const load = (async () => {
	const entries = await readDir('characters', { dir: BaseDirectory.AppConfig });

	const res = await Promise.all(entries.map(normalizeEntry));

	return {
		characters: res
			.filter((entry): entry is [string, CharacterSheet] => !!entry[0] && !!entry[1])
			.map(([fileName, data]) => ({ id: fileName, name: data.name }))
	};
}) satisfies PageLoad;

async function normalizeEntry(entry: FileEntry) {
	const res = await readTextFile(entry.path, { dir: BaseDirectory.AppConfig });
	return [entry.name, JSON.parse(res) as CharacterSheet];
}
