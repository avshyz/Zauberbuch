<script lang="ts">
	import type { Spell } from '$lib/assets/SrdSpells';
	import { characterSheet } from '$lib/stores/character';
	import { Button } from 'spaper';

	export let row: Spell;
</script>

<Button
	disabled={$characterSheet.spellSlots[row.level] <= 0}
	size="small"
	on:click={() => {
		characterSheet.actions.castSpell(row);
	}}
>
	Cast
</Button>
