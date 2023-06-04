<script lang="ts">
	import spells from '$lib/assets/SrdSpells';
</script>

<h2>Spell Management</h2>

{#each spells as spell}
	<p>{spell.name}</p>
{/each}
