<script lang="ts">
	import SpellTable from '$lib/components/SpellTable';
	import { characterSheet } from '$lib/stores/character.js';
	import { Button, Modal } from 'spaper';

	let showCharacterInfo = false;
</script>

<div class="padding row flex-edges flex-middle">
	<h3 class="margin-none">Spellbook</h3>
	<div class="col padding-none padding-right">
		<Button
			size="small"
			on:click={() => {
				showCharacterInfo = true;
			}}
		>
			Show Info
		</Button>
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
		Cast ({$characterSheet.spellSlots[spell.level]}/{$characterSheet.availableSpellSlots[
			spell.level
		]})
	</Button>
</SpellTable>
<Modal bind:active={showCharacterInfo} title="Character Info">
	<p>
		<em>Proficiency Bonus:</em>
		+{$characterSheet.proficiencyBonus}
	</p>
	<p>
		<em>Spellcasting Ability:</em>
		+XXX
	</p>
	<p><em>Spell Slots</em></p>
	<p>
		{#each $characterSheet.availableSpellSlots as slot, i}
			{i}:
			{#each Array.from({ length: slot }) as spellSlot, j}
				<input class="slot" type="checkbox" checked={j < $characterSheet.spellSlots[i]} />
			{/each}
			<br />
		{/each}
	</p>
</Modal>

<style>
	.slot {
		display: inline;
		margin-inline: 2px;
		pointer-events: none;
	}
</style>
