<script lang="ts">
	import SpellTable from '$lib/components/SpellTable.svelte';
	import { characterSheet } from '$lib/stores/character.js';
	import { Button, Table } from 'spaper';
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

<SpellTable spells={$characterSheet.learnedSpells}>
	<Button
		slot="action"
		let:spell
		disabled={$characterSheet.spellSlots[spell.level] <= 0}
		size="small"
		on:click={() => {
			characterSheet.actions.castSpell(spell);
		}}
	>
		Cast
	</Button>
</SpellTable>
