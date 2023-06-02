import type { CHARACTER_CLASSES } from './consts';

export type CharacterSheet = {
	name: string;
	level: number;
	type: 'full' | 'half' | 'third';
	characterClass: (typeof CHARACTER_CLASSES)[number];
};
