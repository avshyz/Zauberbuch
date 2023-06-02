import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import type { LayoutLoad } from './$types';
import type { CharacterSheet } from '$lib/types';
import { FULL_CASTER_SPELL_SLOTS_PER_LEVEL } from '$lib/spellSlots';

export const load = (async ({ params }) => {
	const { characterId } = params;
	const characterData = await readTextFile(`characters/${characterId}`, {
		dir: BaseDirectory.AppConfig
	});
	const character = JSON.parse(characterData) as CharacterSheet;

	return {
		character,
		uuid: characterId.replace(/\.json$/, ''),
		spellSlots: FULL_CASTER_SPELL_SLOTS_PER_LEVEL[character.level]
	};
}) satisfies LayoutLoad;
