<script lang="ts">
	export let data;
</script>

<h3>Available Spells</h3>

<table>
	<thead>
		<tr>
			<th>Level</th>
			<th>Spell</th>
			<th>Casting Time</th>
			<th>Range</th>
		</tr>
	</thead>
	<tbody>
		{#each data.relevantSpells as spell (spell.name)}
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
			</tr>
		{/each}
	</tbody>
</table>

<style>
	th {
		text-align: left;
	}
</style>
