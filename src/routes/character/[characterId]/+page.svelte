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

{#each data.relevantSpells as spell}
	<p>{spell.name}</p>
{/each}
