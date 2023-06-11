<script lang="ts">
	import SpellTable from '$lib/components/SpellTable';
	import { characterSheet } from '$lib/stores/character.js';
	import { Button } from 'spaper';
</script>

<h3 class="margin">
	Available Spells <span class="badge secondary">{$characterSheet.learnedSpells.length}/XXX</span>
</h3>

<SpellTable spells={$characterSheet.availableSpells}>
	<Button
		slot="action"
		let:spell
		size="small"
		on:click={() => characterSheet.actions.toggleLearnSpell(spell.name)}
	>
		{$characterSheet.isSpellLearned(spell.name) ? 'UNLEARN' : 'LEARN'}
	</Button>
</SpellTable>
