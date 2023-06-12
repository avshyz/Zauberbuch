import type { Renderers } from 'svelte-markdown';
import LinkStub from './LinkStub.svelte';
import Paragraph from './Paragraph.svelte';
import Del from './Del.svelte';
import Code from './Code.svelte';
import ListItem from './ListItem.svelte';

const KEYWORDS = [
	/\b(wisdom|charisma|intelligence|strength|dexterity|constitution) saving throw\b/,
	/\b(wisdom|charisma|intelligence|strength|dexterity|constitution) \(\w+?\) check\b/,
	/\bsaving throw\b/,
	/\bmake a check\b/,
	/\broll\b/,
	/\badvantage\b/,
	/\bdisadvantage\b/,
	/\bresistance\b/,
	// /\bimmune\b/,
	/\buses? \w+? action\b/,
	/\bas an? (bonus) action\b/,
	/\btruesight\b/,
	/\b\dd\d\b/,
	/\bdc\b/,
	/\bimmune\b/,
	/\bbonus to\b/,
	/\bthe spell ends\b/
];

export const RESULTS = [
	/\bon a \w+ save\b/,
	/\bon a (failed|successful)\b/,
	/\bon a (failure|success)\b/,
	/\bfails \w+ sav(e|ing)\b/,
	/\bif (it|the check|you) (succeeds?|fails?)\b/
];

const SECONDARY = [
	/\b(ac( \d+)?)\b/gi,
	/\b(\d+ \+ (its|your|their) (wisdowm|charisma|intelligence|strength|dexterity|constitution|spellcasting ability) modifier)\b/gi,
	/\b(((flying )?speed of )?\d+(\scubic\s|\s|\s?-?\s?)(inch|feet|foot|mile)s?( (cube|square))?( in an hour)?)\b/gi,
	/\b(\d+ (hour|minute|second|round)s?)\b/gi,
	/\b(\d+ (pound|ton)s?)\b/gi,
	/\b(\d+\s?gp)\b/gi,
	/\b((wisdom|charisma|intelligence|strength|dexterity|constitution) of \d+)\b/gi
];
export const CONSTRAINTS = /\b(must|can't|can’t|have to)\b/gi;

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

			return [...SECONDARY, CONSTRAINTS].reduce(
				(curr, acc) => curr.replaceAll(acc, `\`$1\``),
				sentence
			);
		})
		.join('. ');
}
