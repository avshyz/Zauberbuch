<script lang="ts">
	import { availableSpellSlots, characterSheet } from '$lib/stores/character.js';
</script>

<p>Spell Slots: {$availableSpellSlots}</p>

{#each $characterSheet.learnedSpells as spell}
	<p>{spell}</p>
{/each}
