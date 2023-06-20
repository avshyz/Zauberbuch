import type { Renderers } from 'svelte-markdown';
import LinkStub from './LinkStub.svelte';
import Paragraph from './Paragraph.svelte';
import Del from './Del.svelte';
import Code from './Code.svelte';
import ListItem from './ListItem.svelte';

const KEYWORDS = [
	/\b(wisdom|charisma|intelligence|strength|dexterity|constitution) saving throw\b/,
	/\b(wisdom|charisma|intelligence|strength|dexterity|constitution) (\(\w+?\) )?check\b/,
	/\bsaving throw\b/,
	/\bability check\b/,
	/\bmake a (check|ranged spell attack)\b/,
	/\broll\b/
];

export const RESULTS = [
	/\bon a \w+ save\b/,
	/\bif successful\b/,
	/\bon a (failed|successful)\b/,
	/\bon a (failure|success|hit)\b/,
	/\bfails \w+ sav(e|ing)\b/,
	/\bif (it|the check|you) (succeeds?|fails?)\b/
];

export const SECONDARY = [
	/\b(ac( \d+)?)\b/gi,
	/\b[+-](penalty|bonus) to\b/gi,
	/\b(\d+ \+ (its|your|their) (wisdowm|charisma|intelligence|strength|dexterity|constitution|spellcasting ability) modifier)\b/gi,
	/\b(((flying )?speed of )?\d+(,\d+)?(\scubic\s|\s|\s?-?\s?)(inch|feet|foot|mile)s?([ -]radius)?( (cube|square|sphere|circle|cone))?( in an hour)?([ -](tall|wide|deep|thick|high|long))?)\b/gi,
	/\b(\d+ (hour|minute|second|round)s?)\b/gi,
	/\b(\d+(,\d+)? (pound|ton)s?)\b/gi,
	/\b(\d+(,\d+)?\s?gp)\b/gi,
	/\b((wisdom|charisma|intelligence|strength|dexterity|constitution) of \d+)\b/gi,
	/\b(\d+ hit points?)\b/gi,

	/\b(advantage\b)/gi,
	/\b((difficult|normal) terrain\b)/gi,
	/\b(\dd\d+( \+ \d+)?(( \w+)? damage)?)\b/gi,
	/\b(disadvantage\b)/gi,
	/\b(resistance\b)/gi,
	/\b((the \w+? lasts until it is )?dispelled\b)/gi,
	/\b(truesight\b)/gi,
	/\b(dc\b)/gi,
	/\b(immune\b)/gi,
	/\b(\+\d+ bonus to\b)/gi,
	/\b((?<!until )the spell ends\b)/gi
];

export const FOLLOWUP = [/\b(uses? (a )?\w+? action\b)/gi, /\b(as an? (bonus) action\b)/gi];
export const CONDITIONS =
	/\b(blinded|charmed|deafened|frightened|grappled|incapacitated|invisible|paralyzed|petrified|poisoned|prone|restrained|stunned|unconscious|exhaustion)/gi;

export const CONSTRAINTS =
	// must|can't|can&#39;t|can’t|have to| - too noisy?
	/\b(that you can see|automatically)\b/gi;

export const renderers: Partial<Renderers> = {
	link: LinkStub,
	paragraph: Paragraph,
	listitem: ListItem,
	del: Del,
	codespan: Code
};

export function normalizeText(text: string): string {
	return text
		.split('. ')
		.map((s) => {
			const sentence = s.trim();
			if ([...KEYWORDS, ...RESULTS].some((k) => sentence.toLocaleLowerCase().match(k))) {
				return `~~${sentence}~~`;
			}

			return [...FOLLOWUP, ...SECONDARY, CONSTRAINTS, CONDITIONS].reduce(
				(curr, acc) => curr.replaceAll(acc, `\`$1\``),
				sentence
			);
		})
		.join('. ');
}
