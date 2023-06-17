<script lang="ts">
	import type { Spell } from '$lib/assets/SrdSpells';

	import Description from './Description.svelte';
	import Filters from './Filters.svelte';
	import SearchInput from './SearchInput.svelte';

	export let spells: Spell[];

	let filteredSpells = spells;

	let rowExpansion: string | null = null;
</script>

<div class="search-container" style="position: sticky; top: 0">
	<Filters
		on:change={(e) => {
			const filters = e.detail;

			filteredSpells = spells.filter((s) => {
				if (filters.restrained && s.components.somatic) return false;
				if (filters.concentrating && s.concentration) return false;
				if (filters.silenced && s.components.verbal) return false;
				if (filters.blinded && s.description.toLocaleLowerCase().includes('that you can see'))
					return false;
				return true;
			});
		}}
	/>
	<SearchInput
		on:change={(e) => {
			const value = e.detail;
			const arr = Array.from(document.querySelectorAll('.spell-name')).filter((n) => {
				return n.textContent?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ?? false;
			});
			if (arr.length === 1) arr[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
		}}
	/>
</div>
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
	.search-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-inline: 20px;
		padding-block: 10px;
		background: white;

		border-color: transparent transparent gray transparent;
	}
</style>
