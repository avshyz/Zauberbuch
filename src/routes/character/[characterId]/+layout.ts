import { character } from '$lib/stores/characterSheet';

export const load = async ({ params }) => {
	const { characterId } = params;
	await character.load(characterId);
};

