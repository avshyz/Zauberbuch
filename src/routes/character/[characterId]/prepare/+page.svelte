<script lang="ts">
	import SpellTable from '$lib/components/SpellTable';
	import { characterSheet } from '$lib/stores/character.js';
	import { Button } from 'spaper';
</script>

<h3 class="margin">
	Available Spells <span class="badge secondary" title="Prepared spells">
		{$characterSheet.preparedSpells.length}
	</span>
</h3>

<SpellTable spells={$characterSheet.learnedSpells}>
	<Button
		slot="action"
		let:spell
		size="small"
		type={$characterSheet.isSpellPrepared(spell.name) ? 'danger' : undefined}
		on:click={() => characterSheet.actions.togglePrepareSpell(spell.name)}
	>
		{$characterSheet.isSpellPrepared(spell.name) ? 'UNPREPARE' : 'PREPARE'}
	</Button>
</SpellTable>
