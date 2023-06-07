import { character } from '$lib/stores/characterSheet';

export const load = async () => {
	return {
		characters: character.getAllCharacters()
	};
};
