import type { CHARACTER_CLASSES } from './consts';
import type { SpellSlots } from './mechanics';

export type CharacterClass = (typeof CHARACTER_CLASSES)[number];

export type CharacterSheet = {
	name: string;
	level: number;
	characterClass: CharacterClass;
	spellCastingAbility: number;
	spellSlots: SpellSlots;
	learnedSpellsIds: string[];
	preparedSpellsIds: string[];
};

export type CharacterFormResult = Pick<
	CharacterSheet,
	'name' | 'level' | 'characterClass' | 'spellCastingAbility'
>;
