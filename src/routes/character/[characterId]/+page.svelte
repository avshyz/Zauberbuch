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
		disabled={spell.level > 0 && $characterSheet.spellSlots[spell.level - 1] <= 0}
		size="small"
		on:click={() => {
			characterSheet.actions.castSpell(spell);
		}}
	>
		Cast {#if spell.level > 0}
			({$characterSheet.spellSlots[spell.level - 1]}/{$characterSheet.availableSpellSlots[
				spell.level - 1
			]})
		{:else}
			Cantrip
		{/if}
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
		{#each $characterSheet.availableSpellSlots.filter((slot) => slot > 0) as slot, i}
			{i + 1}:
			<div class="slot-container">
				{#each Array.from({ length: slot }) as _spellSlot, j}
					<input class="slot" type="checkbox" checked={j < $characterSheet.spellSlots[i]} />
				{/each}
			</div>
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
	.slot-container {
		display: inline-block;
	}
</style>
