<script lang="ts">
	import SvelteMarkdown, { type Renderers } from 'svelte-markdown';
	import { renderers } from './renderers/utils';

	export let upcast: string | undefined;
	export let description: string;

	$: normalizedDescription = description;
</script>

<div class="spell-description padding">
	<SvelteMarkdown source={normalizedDescription} {renderers} />

	{#if upcast}
		<hr />
		<SvelteMarkdown source={`**At higher levels** : ${upcast}`} />
	{/if}
</div>

<style>
	.spell-description {
		white-space: pre-wrap;
		color: black;
		cursor: auto;

		/* READABILITY */
		font-size: 1.125rem;
		line-height: 1.6;
		width: min(65ch, 100% - 4rem);
		margin-inline: auto;
	}
	.spell-description :global(td) {
		text-align: left !important;
	}
</style>
