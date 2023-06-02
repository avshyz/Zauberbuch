import type { PageServerLoad } from './$types';
import { readDir, createDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs';

export const load = (async () => {
	return {
		characters: [{ id: 1, name: 'Brieuc' }]
	};
}) satisfies PageServerLoad;
