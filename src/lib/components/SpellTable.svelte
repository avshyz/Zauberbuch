<script lang="ts">
	import type { Spell } from '$lib/assets/SrdSpells';
	import { fade } from 'svelte/transition';
	import SvelteMarkdown from 'svelte-markdown';
	import LinkStub from './LinkStub.svelte';

	export let spells: Spell[];
	let rowExpansion: Record<string, boolean> = {};
</script>

<table class="table-hover margin">
	<thead>
		<tr>
			<th>Level</th>
			<th>Spell</th>
			<th>Casting Time</th>
			<th>Range</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		{#each spells as spell (spell.name)}
			<tr on:click={() => (rowExpansion[spell.name] = !rowExpansion[spell.name])}>
				<td>
					{spell.level}
					{#if spell.higher_levels}
						<span title="Upcast possible">💪</span>
					{/if}
				</td>
				<td>{spell.name}</td>
				<td>
					{spell.casting_time}
					{#if spell.ritual}
						<span title="Ritual Cast-able">📖</span>
					{/if}
					{#if spell.reaction_trigger}
						<span title={spell.reaction_trigger}>ℹ️</span>
					{/if}
				</td>
				<td>{spell.range}</td>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<td on:click|stopPropagation>
					<slot name="action" {spell} />
				</td>
			</tr>
			{#if rowExpansion[spell.name]}
				<tr transition:fade>
					<td colspan="5">
						<div class="spell-description padding">
							<SvelteMarkdown source={spell.description} renderers={{ link: LinkStub }} />

							{#if spell.higher_levels}
								<hr />
								<SvelteMarkdown source={`**At heigher levels**: ${spell.higher_levels}`} />
							{/if}
						</div>
					</td>
				</tr>
			{/if}
		{/each}
	</tbody>
</table>

<style>
	th {
		text-align: left;
	}

	[title] {
		cursor: help;
	}

	tr {
		cursor: pointer;
	}

	td {
		vertical-align: bottom;
	}

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
