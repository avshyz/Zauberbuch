import type { PageLoad } from './$types';
import { readTextFile, readDir, BaseDirectory, type FileEntry } from '@tauri-apps/api/fs';

export const load = (async () => {
	const entries = await readDir('characters', { dir: BaseDirectory.AppConfig });

	const res = await Promise.all(entries.map(normalizeEntry));

	return {
		characters: res.map(([fileName, data]) => ({ id: fileName, name: JSON.parse(data).name}))
	};

}) satisfies PageLoad;

async function normalizeEntry(entry: FileEntry) {
	const res = await readTextFile(entry.path, { dir: BaseDirectory.AppConfig })
	return [entry.name!, res!]
}