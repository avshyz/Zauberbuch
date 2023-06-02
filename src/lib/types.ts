import type { CHARACTER_CLASSES } from './consts';

export type CharacterClass = (typeof CHARACTER_CLASSES)[number];

export type CharacterSheet = {
	name: string;
	level: number;
	type: 'full' | 'half' | 'third';
	characterClass: CharacterClass;
};

export type CasterType = 'full' | 'half' | 'third';
