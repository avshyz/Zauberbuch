<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>{data.character.name}</h1>
<h2>{data.character.characterClass} - Level {data.character.level}</h2>

<nav>
	<li><a href="settings">Manage Character</a></li>
</nav>

<p>Spell Slots: {data.spellSlots}</p>

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
