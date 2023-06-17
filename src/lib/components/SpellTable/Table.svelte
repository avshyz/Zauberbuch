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
			<th>Duration</th>
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
						<span title="Upcast possible" class="badge success">*</span>
					{/if}
				</td>
				<td>
					{spell.name}
					{#if spell.concentration}
						<span title="Requires concentration" class="badge danger">C</span>
					{/if}
					{#if spell.ritual}
						<span title="Ritual Cast-able" class="badge secondary">Ritual</span>
					{/if}
					{#if spell.casting_time !== 'action'}
						<span class="badge sucess">{spell.casting_time}</span>
					{/if}
					{#if spell.reaction_trigger}
						<span title={spell.reaction_trigger} class="badge warning">i</span>
					{/if}
				</td>
				<td>{spell.duration}</td>
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
					<td colspan={$$slots.action ? 5 : 4}>
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
		vertical-align: middle;
	}

	table {
		width: 95%;
	}
</style>
