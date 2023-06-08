import type { CHARACTER_CLASSES } from './consts';

export type CharacterClass = (typeof CHARACTER_CLASSES)[number];

export type CharacterSheet = {
	name: string;
	level: number;
	characterClass: CharacterClass;
	learnedSpells: string[];
};

export type CharacterFormResult = Omit<CharacterSheet, 'learnedSpells'>;
