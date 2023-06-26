<script lang="ts">
	import spells from '$lib/assets/SrdSpells';
	import SpellTable from '$lib/components/SpellTable/Table.svelte';
	import SpellForm from '$lib/components/SpellForm.svelte';
	import { spellStore } from '$lib/stores/spells';
</script>

<h2>Spell Management</h2>

<SpellForm
	on:submit={({ detail: s }) => {
		spellStore.actions.saveSpell(s);
	}}
/>

{#if $spellStore.length}
	<SpellTable spells={$spellStore} />
{/if}
