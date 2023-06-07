<script lang="ts">
	export let data;
</script>

<p>Spell Slots: {data.spellSlots}</p>

{#each data.character.learnedSpells as spell}
	<p>{spell}</p>
{/each}
