<script lang="ts">
	import type { Spell } from '$lib/assets/SrdSpells';
	import { trusted } from 'svelte/internal';
	import Description from './Description.svelte';
	import SearchInput from './SearchInput.svelte';

	export let spells: Spell[];
	let rowExpansion: string | null = null;

	let filters = {
		restrained: false,
		blinded: false,
		concentrating: false,
		silenced: false
	} as const;

	$: filteredSpells = spells.filter((s) => {
		if (filters.restrained && s.components.somatic) return false;
		if (filters.concentrating && s.concentration) return false;
		if (filters.silenced && s.components.verbal) return false;
		if (filters.blinded && s.description.toLocaleLowerCase().includes('that you can see'))
			return false;
		return true;
	});
</script>

<div class="filter-container">
	{#each Object.keys(filters) as condition}
		<div class="field-container">
			<input id={condition} name={condition} bind:checked={filters[condition]} type="checkbox" />
			<label for={condition}>{condition}</label>
		</div>
	{/each}
</div>

<SearchInput
	on:change={(e) => {
		const value = e.detail;
		const arr = Array.from(document.querySelectorAll('.spell-name')).filter((n) => {
			return n.textContent?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ?? false;
		});
		if (arr.length === 1) arr[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
	}}
/>

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
		{#each filteredSpells as spell (spell.name)}
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
					<span class="spell-name">{spell.name}</span>
					{#if spell.concentration}
						<span title="Requires concentration" class="badge danger">C</span>
					{/if}
					{#if spell.ritual}
						<span title="Ritual Cast-able" class="badge secondary">Ritual</span>
					{/if}
					{#if spell.casting_time !== 'action'}
						<span title="Casting time" class="badge sucess">{spell.casting_time}</span>
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

	.filter-container {
		display: flex;
		gap: 16px;
	}
	.field-container {
		display: flex;
		align-items: center;
		gap: 5px;
	}
</style>
