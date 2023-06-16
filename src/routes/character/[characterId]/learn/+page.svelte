<script lang="ts">
	import SpellTable from '$lib/components/SpellTable';
	import { characterSheet } from '$lib/stores/character.js';
	import { Button } from 'spaper';
</script>

<h3 class="margin">
	Available Spells <span class="badge secondary" title="Learned spells">
		{$characterSheet.learnedSpells.length}
	</span>
</h3>

<SpellTable spells={$characterSheet.learnableSpells}>
	<Button
		slot="action"
		let:spell
		size="small"
		type={$characterSheet.isSpellLearned(spell.name) ? 'danger' : undefined}
		on:click={() => characterSheet.actions.toggleLearnSpell(spell.name)}
	>
		{$characterSheet.isSpellLearned(spell.name) ? 'UNLEARN' : 'LEARN'}
	</Button>
</SpellTable>
