import { characterSheet } from '$lib/stores/character';

export const load = async () => {
	return {
		characters: await characterSheet.listAllCharacters()
	};
};
