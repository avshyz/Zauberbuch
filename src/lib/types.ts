import type { CASTER_TYPES, CHARACTER_CLASSES } from './consts';

export type CharacterClass = (typeof CHARACTER_CLASSES)[number];

export type CharacterSheet = {
	name: string;
	level: number;
	characterClass: CharacterClass;
};

export type CasterType = (typeof CASTER_TYPES)[number];
