<script lang="ts">
	import type { Spell } from '$lib/assets/SrdSpells';

	export let spells: Spell[];
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
			<tr>
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
				<td>
					<slot name="action" {spell} />
				</td>
			</tr>
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
</style>
