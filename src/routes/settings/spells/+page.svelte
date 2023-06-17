<script lang="ts">
	import spells from '$lib/assets/SrdSpells';
	import SpellTable from '$lib/components/SpellTable/Table.svelte';
	import { spellStore } from '$lib/stores/spells';
</script>

<h2>Spell Management</h2>

<SpellTable {spells} />
