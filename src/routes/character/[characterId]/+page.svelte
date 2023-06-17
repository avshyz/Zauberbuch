<script lang="ts">
	import type { Spell } from '$lib/assets/SrdSpells';
	import SpellTable from '$lib/components/SpellTable';
	import { characterSheet } from '$lib/stores/character.js';
	import { Button, Modal } from 'spaper';

	let showCharacterInfo = false;

	function getSlotsForSpell(spell: Spell) {
		return $characterSheet.spellSlots[spell.level - 1];
	}

	function getMaxAvailableSlotsForSpell(spell: Spell) {
		return $characterSheet.availableSpellSlots[spell.level - 1];
	}
</script>

<div class="padding row flex-edges flex-middle">
	<h3 class="margin-none">Spellbook</h3>
	{#if $characterSheet.currentConcentration}
		<div class="row">
			<h4>{$characterSheet.currentConcentration}</h4>
			<button
				class="btn-small btn-warning"
				on:click={() => characterSheet.actions.breakConcentration()}
			>
				Break
			</button>
		</div>
	{/if}
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

<SpellTable spells={$characterSheet.playableSpells}>
	<button
		slot="action"
		let:spell
		class="btn-small"
		disabled={spell.level > 0 && $characterSheet.spellSlots[spell.level - 1] <= 0}
		title={spell.concentration && !!$characterSheet.currentConcentration
			? `Already concentrating on: ${$characterSheet.currentConcentration}`
			: null}
		class:btn-danger={spell.concentration && !!$characterSheet.currentConcentration
			? 'danger'
			: undefined}
		on:click={() => {
			characterSheet.actions.castSpell(spell);
		}}
	>
		Cast {#if spell.level > 0}
			({getSlotsForSpell(spell)}/{getMaxAvailableSlotsForSpell(spell)})
		{:else}
			Cantrip
		{/if}
	</button>
</SpellTable>
<Modal bind:active={showCharacterInfo} title="Character Info">
	<p>
		<em>Proficiency Bonus:</em>
		+{$characterSheet.proficiencyBonus}
	</p>
	<p>
		<em>Spellcasting Ability:</em>
		+{$characterSheet.spellCastingAbility}
	</p>

	<p>
		<em>Spell Save DC:</em>
		DC {8 + $characterSheet.proficiencyBonus + $characterSheet.spellCastingAbility}
	</p>

	<p>
		<em>Spell Attack Bonus:</em>
		+{$characterSheet.proficiencyBonus + $characterSheet.spellCastingAbility}
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
