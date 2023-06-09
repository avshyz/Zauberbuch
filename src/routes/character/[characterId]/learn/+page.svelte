<script lang="ts">
	import { characterSheet } from '$lib/stores/character.js';
	import { Button } from 'spaper';
</script>

<h3 class="margin">Available Spells</h3>

<table class="table-hover margin">
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
		{#each $characterSheet.availableSpells as spell (spell.name)}
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
					<Button size="small" on:click={() => characterSheet.actions.toggleLearnSpell(spell.name)}>
						{$characterSheet.isSpellLearned(spell.name) ? 'UNLEARN' : 'LEARN'}
					</Button>
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
