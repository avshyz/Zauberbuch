<script lang="ts">
	import SpellTable from '$lib/components/SpellTable.svelte';
	import { characterSheet } from '$lib/stores/character.js';
	import { Button } from 'spaper';
	import CastButton from './CastButton.svelte';
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

<SpellTable spells={$characterSheet.learnedSpells} Action={CastButton} />
