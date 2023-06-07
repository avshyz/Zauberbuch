import type { CharacterSheet, CharacterClass } from '$lib/types';
import { CASTER_TYPE_TO_SLOT_TABLE } from '$lib/spellSlots';
import spells from '$lib/assets/SrdSpells';
import { loadCharacter } from '$lib/orm/character';

const SPELL_LIST_MAPPER: { [key in CharacterClass]?: CharacterClass } = {
	rogue: 'wizard',
	fighter: 'wizard'
};

export const load = async ({ params }) => {
	const { characterId } = params;
	const character = await loadCharacter(characterId);

	const relevantSpells = spells
		.filter(
			({ level, classes }) =>
				classes.includes(SPELL_LIST_MAPPER[character.characterClass] ?? character.characterClass) &&
				level <= getCharacterMaxSpellLevel(character)
		)
		.sort((a, b) => a.name.localeCompare(b.name))
		.sort((a, b) => a.level - b.level);

	return {
		character,
		uuid: characterId,
		spellSlots: getCharacterSpellSlots(character),
		relevantSpells
	};
};

function getCharacterSpellSlots(character: CharacterSheet) {
	return CASTER_TYPE_TO_SLOT_TABLE[character.characterClass]?.[character.level - 1];
}

function getCharacterMaxSpellLevel(character: CharacterSheet) {
	return getCharacterSpellSlots(character)?.findLastIndex((slots) => slots > 0) ?? 0;
}
