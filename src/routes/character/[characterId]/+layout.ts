import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import type { LayoutLoad } from './$types';
import type { CharacterSheet } from '$lib/types';
import { CASTER_TYPE_TO_SLOT_TABLE } from '$lib/spellSlots';

export const load = (async ({ params }) => {
	const { characterId } = params;
	const characterData = await readTextFile(`characters/${characterId}`, {
		dir: BaseDirectory.AppConfig
	});
	const character = JSON.parse(characterData) as CharacterSheet;

	return {
		character,
		uuid: characterId,
		spellSlots: CASTER_TYPE_TO_SLOT_TABLE[character.characterClass]?.[character.level - 1]
	};
}) satisfies LayoutLoad;
