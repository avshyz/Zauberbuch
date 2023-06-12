<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { normalizeText, renderers } from './utils';

	export let text: string;
	$: normalizedText = normalizeText(text);
	const { listitem, ...normalizedRenderers } = renderers;
</script>

<li><SvelteMarkdown isInline source={normalizedText} renderers={normalizedRenderers} /></li>
