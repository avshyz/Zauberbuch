<script lang="ts">
	import SpellTable from '$lib/components/SpellTable.svelte';
	import { characterSheet } from '$lib/stores/character.js';
	import LearnButton from './LearnButton.svelte';
</script>

<h3 class="margin">
	Available Spells <span class="badge secondary">{$characterSheet.learnedSpells.length}/XXX</span>
</h3>

<SpellTable spells={$characterSheet.availableSpells} Action={LearnButton} />
