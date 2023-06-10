<script lang="ts">
	import type { Spell } from '$lib/assets/SrdSpells';
	import { characterSheet } from '$lib/stores/character';
	import { Button } from 'spaper';

	export let row: Spell;
</script>

<Button size="small" on:click={() => characterSheet.actions.toggleLearnSpell(row.name)}>
	{$characterSheet.isSpellLearned(row.name) ? 'UNLEARN' : 'LEARN'}
</Button>
