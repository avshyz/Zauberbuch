<script lang="ts">
	import { characterSheet } from '$lib/stores/character.js';
</script>

<p>Spell Slots: {$characterSheet.availableSpellSlots}</p>

{#each $characterSheet.learnedSpells as spell (spell.name)}
	<p>{spell.name} {spell.level} <button>Cast</button></p>
{/each}
