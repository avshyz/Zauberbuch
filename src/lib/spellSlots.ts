import type { CharacterClass } from './types';

type Tuple<TItem, TLength extends number> = readonly [TItem, ...TItem[]] & { length: TLength };

type SlotTable = Tuple<Tuple<number, 10>, 20>;

const FULL_CASTER: SlotTable = [
	[3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 4, 2, 0, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 0, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 2, 0, 0, 0, 0, 0, 0],

	[4, 4, 3, 3, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 3, 1, 0, 0, 0, 0, 0],
	[4, 4, 3, 3, 2, 0, 0, 0, 0, 0],
	[4, 4, 3, 3, 3, 1, 0, 0, 0, 0],
	[5, 4, 3, 3, 3, 2, 0, 0, 0, 0],

	[5, 4, 3, 3, 3, 2, 1, 0, 0, 0],
	[5, 4, 3, 3, 3, 2, 1, 0, 0, 0],
	[5, 4, 3, 3, 3, 2, 1, 1, 0, 0],
	[5, 4, 3, 3, 3, 2, 1, 1, 0, 0],
	[5, 4, 3, 3, 3, 2, 1, 1, 1, 0],

	[5, 4, 3, 3, 3, 2, 1, 1, 1, 0],
	[5, 4, 3, 3, 3, 2, 1, 1, 1, 1],
	[5, 4, 3, 3, 3, 3, 1, 1, 1, 1],
	[5, 4, 3, 3, 3, 3, 2, 1, 1, 1],
	[5, 4, 3, 3, 3, 3, 2, 2, 1, 1]
] as const;

const ROGUE: SlotTable = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 2, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 4, 2, 0, 0, 0, 0, 0, 0, 0],
	[3, 4, 2, 0, 0, 0, 0, 0, 0, 0],
	[3, 4, 2, 0, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 0, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 0, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 0, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 2, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 2, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 2, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 3, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 3, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 3, 0, 0, 0, 0, 0, 0],
	[4, 4, 3, 3, 1, 0, 0, 0, 0, 0],
	[4, 4, 3, 3, 1, 0, 0, 0, 0, 0]
] as const;

const RANGER: SlotTable = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
	[4, 2, 0, 0, 0, 0, 0, 0, 0, 0],
	[4, 3, 0, 0, 0, 0, 0, 0, 0, 0],
	[4, 3, 0, 0, 0, 0, 0, 0, 0, 0],
	[4, 3, 2, 0, 0, 0, 0, 0, 0, 0],
	[4, 3, 2, 0, 0, 0, 0, 0, 0, 0],
	[4, 3, 3, 0, 0, 0, 0, 0, 0, 0],
	[4, 3, 3, 0, 0, 0, 0, 0, 0, 0],
	[4, 3, 3, 1, 0, 0, 0, 0, 0, 0],
	[4, 3, 3, 1, 0, 0, 0, 0, 0, 0],
	[4, 3, 3, 2, 0, 0, 0, 0, 0, 0],
	[4, 3, 3, 2, 0, 0, 0, 0, 0, 0],
	[4, 3, 3, 3, 1, 0, 0, 0, 0, 0],
	[4, 3, 3, 3, 1, 0, 0, 0, 0, 0],
	[4, 3, 3, 3, 2, 0, 0, 0, 0, 0],
	[4, 3, 3, 3, 2, 0, 0, 0, 0, 0]
] as const;

export const CASTER_TYPE_TO_SLOT_TABLE: Record<CharacterClass, SlotTable | undefined> = {
	barbarian: undefined,
	bard: FULL_CASTER,
	cleric: FULL_CASTER,
	druid: FULL_CASTER,
	fighter: undefined,
	monk: undefined,
	paladin: undefined,
	ranger: RANGER,
	rogue: ROGUE,
	sorcerer: FULL_CASTER,
	warlock: undefined,
	wizard: FULL_CASTER
};
