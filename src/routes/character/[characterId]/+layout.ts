import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import type { LayoutLoad } from './$types';
import type { CharacterSheet } from '$lib/types';

export const load = (async ({ params }) => {
	const { characterId } = params;
	const character = await readTextFile(`characters/${characterId}`, {
		dir: BaseDirectory.AppConfig
	});
	return {
		character: JSON.parse(character) as CharacterSheet,
		uuid: characterId.replace(/\.json$/, '')
	};
}) satisfies LayoutLoad;
