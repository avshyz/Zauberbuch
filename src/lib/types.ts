import type { CHARACTER_CLASSES } from './consts';
import type { SpellSlots } from './spellSlots';

export type CharacterClass = (typeof CHARACTER_CLASSES)[number];

export type CharacterSheet = {
	name: string;
	level: number;
	characterClass: CharacterClass;
	learnedSpellsIds: string[];
	spellSlots: SpellSlots;
};

export type CharacterFormResult = Omit<CharacterSheet, 'learnedSpells' | 'spellSlots'>;
