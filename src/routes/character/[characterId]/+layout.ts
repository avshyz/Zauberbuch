import { characterSheet } from '$lib/stores/character.js';

export const load = async ({ params }) => {
	const { characterId } = params;
	await characterSheet.actions.load(characterId);
};
