<script lang="ts">
	import type { Spell } from '$lib/assets/SrdSpells';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

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
				<td>{spell.level}</td>
				<td>{spell.name}</td>
				<td>
					{spell.casting_time}
					{#if spell.ritual}
						<span>(ritual)</span>
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
							{spell.description}
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

	.spell-description {
		white-space: pre-wrap;
	}
</style>
