<script lang="ts">
	import { characterSheet } from '$lib/stores/character.js';
	import { Button, Table } from 'spaper';
</script>

<h3 class="margin">Spellbook</h3>

<div class="row flex-edges flex-middle">
	<div class="col">Spell Slots: {$characterSheet.spellSlots}</div>
	<div class="col">
		<Button
			size="small"
			on:click={() => {
				// TODO ADD CONFIRMATION HERE
				characterSheet.actions.rest();
			}}
		>
			Long Rest!
		</Button>
	</div>
</div>

<table class="table-hover margin">
	<thead>
		<tr>
			<th>Level</th>
			<th>Spell</th>
			<th>Casting Time</th>
			<th>Range</th>
			<th>Duration</th>
			<th class="action">Action</th>
		</tr>
	</thead>
	<tbody>
		{#each $characterSheet.learnedSpells as spell (spell.name)}
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
				<td>{spell.duration}</td>
				<td>
					<Button
						on:click={() => {
							characterSheet.actions.castSpell(spell);
						}}
						disabled={$characterSheet.spellSlots[spell.level] <= 0}
						size="small"
					>
						Cast
					</Button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
