import type { Renderers } from 'svelte-markdown';
import LinkStub from './LinkStub.svelte';
import Paragraph from './Paragraph.svelte';
import Del from './Del.svelte';
import Code from './Code.svelte';
import ListItem from './ListItem.svelte';

const KEYWORDS = [
	/\b(wisdowm|charisma|intelligence|strength|dexterity|constitution) saving throw\b/,
	/\b(wisdowm|charisma|intelligence|strength|dexterity|constitution) \(\w+?\) check\b/,
	/\bsaving throw\b/,
	/\bmake a check\b/,
	/\broll\b/,
	/\badvantage\b/,
	/\bdisadvantage\b/,
	/\bresistance\b/,
	// /\bimmune\b/,
	/\uses? its action\b/,
	/\btruesight\b/,
	/\b\dd\d\b/,
	/\bdc\b/
];

export const RESULTS = [
	/\bon a \w+ save\b/,
	/\bon a (failed|successful)\b/,
	/\bon a (failure|success)\b/,
	/\bif (it|the check) (succeeds?|fails?)\b/
];

const SECONDARY = [
	/\bac\b/,
	/\b(inch|feet|foot|mile)\b/,
	/\b(hour|minute|second|round)s?\b/,
	/\b(pound|ton)s?\b/,
	/\b\d+gp\b/
];

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
			if (KEYWORDS.some((k) => sentence.toLocaleLowerCase().match(k))) {
				return `~~${sentence}~~`;
			}

			if (RESULTS.some((k) => sentence.toLocaleLowerCase().match(k))) {
				// TODO IMPLEMENT BETTER
				return `~~${sentence}~~`;
			}

			if (SECONDARY.some((k) => sentence.toLocaleLowerCase().match(k))) {
				return `\`${sentence}\``;
			}
			return sentence;
		})
		.join('. ');
}
