<script lang="ts">
	import type { Spell } from '$lib/assets/SrdSpells';
	import { fade } from 'svelte/transition';
	import Description from './Description.svelte';

	export let spells: Spell[];
	let rowExpansion: string | null = null;
</script>

<table class="table-hover margin">
	<thead>
		<tr>
			<th>Level</th>
			<th>Spell</th>
			<th>Casting Time</th>
			<th>Range</th>
			{#if $$slots.action}
				<th>Action</th>
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each spells as spell (spell.name)}
			<tr
				on:click={() =>
					rowExpansion === spell.name ? (rowExpansion = null) : (rowExpansion = spell.name)}
			>
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
				{#if $$slots.action}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<td on:click|stopPropagation>
						<slot name="action" {spell} />
					</td>
				{/if}
			</tr>
			{#if rowExpansion === spell.name}
				<tr>
					<td colspan="5">
						<Description description={spell.description} upcast={spell.higher_levels} />
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
</style>