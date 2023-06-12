<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import { normalizeText, renderers } from './utils';

	export let text: string;
	const { paragraph, ...normalizedRenderers } = renderers;
	$: normalizedText = normalizeText(text);
</script>

<SvelteMarkdown source={normalizedText} renderers={normalizedRenderers} />
