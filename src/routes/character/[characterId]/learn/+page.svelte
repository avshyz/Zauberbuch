<script lang="ts">
	import { availableSpells, characterSheet, isSpellLearned } from '$lib/stores/character.js';
</script>

<h3>Available Spells</h3>

<table>
	<thead>
		<tr>
			<th>Level</th>
			<th>Spell</th>
			<th>Casting Time</th>
			<th>Range</th>
			<th>action</th>
		</tr>
	</thead>
	<tbody>
		{#each $availableSpells as spell (spell.name)}
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
					<button type="button" on:click={() => characterSheet.toggleLearnSpell(spell.name)}>
						{$isSpellLearned(spell.name) ? 'UNLEARN' : 'LEARN'}
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	th {
		text-align: left;
	}
</style>
