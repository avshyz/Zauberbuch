import { listCharacters } from '$lib/orm/character';

export const load = async () => {
	return {
		characters: await listCharacters()
	};
};
