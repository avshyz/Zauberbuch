import type { SpellSlots } from './mechanics';

export const CHARACTER_CLASSES = [
	'barbarian',
	'bard',
	'cleric',
	'druid',
	'fighter',
	'monk',
	'paladin',
	'ranger',
	'rogue',
	'sorcerer',
	'warlock',
	'wizard'
] as const;
export type CharacterClass = (typeof CHARACTER_CLASSES)[number];

export const SCHOOLS = [
	'Abjuration',
	'Conjuration',
	'Divination',
	'Enchantment',
	'Evocation',
	'Illusion',
	'Necromancy',
	'Transmutation'
];
type School = (typeof SCHOOLS)[number];

export type CharacterSheet = {
	name: string;
	level: number;
	characterClass: CharacterClass;
	spellCastingAbility: number;

	spellSlots: SpellSlots;

	learnedSpellsIds: string[];
	preparedSpellsIds: string[];

	currentConcentration: string | undefined;
};

export type CharacterFormResult = Pick<
	CharacterSheet,
	'name' | 'level' | 'characterClass' | 'spellCastingAbility'
>;

type TimeUnit = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
type Pluralize<T extends string> = `${T}${'' | 's'}`;

type CastingType = 'action' | 'bonus action' | 'reaction' | `${number} ${Pluralize<TimeUnit>}`;

type Duration =
	| 'instant'
	| 'until dispelled'
	| 'until triggered'
	| 'special'
	| `${number} ${Pluralize<TimeUnit | 'round'>}`
	| `up to ${number} ${Pluralize<TimeUnit | 'round'>}`;

type Range =
	| `${number} ${'mile' | 'miles' | 'feet' | 'foot'}`
	| 'touch'
	| 'self'
	| 'sight'
	| 'special'
	| 'unlimited'
	| `self ${string}`;

type Area = 'cone' | 'cube' | 'cylinder' | 'line' | 'sphere';

export type Spell = {
	casting_time: CastingType | `${CastingType} or ${CastingType}`;
	classes: CharacterClass[];
	components: {
		material: boolean;
		somatic: boolean;
		verbal: boolean;
		raw: string;
		materials_needed?: string[];
	};
	description: string;
	duration: Duration | `${Duration} or ${Duration}`;
	concentration?: boolean;
	name: string;
	range: Range;
	area?: `${number} ${'mile' | 'miles' | 'feet' | 'foot'} ${Area}`;
	ritual: boolean;
	school: School;
	higher_levels?: string;
	reaction_trigger?: string;
	level: number;
	tags?: string[];
	type?: string;
};
