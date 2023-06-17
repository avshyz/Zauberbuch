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

	function isConcentrationBreaking(spell: Spell) {
		return spell.concentration && !!$characterSheet.currentConcentration;
	}
	function isCantrip(spell: Spell) {
		return spell.level === 0;
	}
</script>

<div class="padding row flex-edges flex-middle">
	<h3 class="margin-none">Spellbook</h3>
	{#if $characterSheet.currentConcentration}
		<div class="row margin-none" style="gap: 8px">
			<h4 class="margin-none">{$characterSheet.currentConcentration}</h4>
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
	<div slot="action" let:spell>
		<button
			class="btn-small"
			disabled={!isCantrip(spell) && $characterSheet.spellSlots[spell.level - 1] <= 0}
			title={isConcentrationBreaking(spell)
				? `Already concentrating on: ${$characterSheet.currentConcentration}`
				: null}
			class:btn-danger={isConcentrationBreaking(spell) ? 'danger' : undefined}
			on:click={() => {
				characterSheet.actions.castSpell(spell);
			}}
		>
			Cast {#if !isCantrip(spell)}
				({getSlotsForSpell(spell)}/{getMaxAvailableSlotsForSpell(spell)})
			{:else}
				Cantrip
			{/if}
		</button>
		{#if !isCantrip(spell) && getSlotsForSpell(spell) < getMaxAvailableSlotsForSpell(spell)}
			<button
				title={`Regain spell slot lvl ${spell.level}`}
				class="btn-small"
				on:click={() => characterSheet.actions.regainSlot(spell.level)}
			>
				⎌
			</button>
		{/if}
	</div>
</SpellTable>
<Modal bind:active={showCharacterInfo} title="Character Info">
	<table class="table-hover padding">
		<tbody>
			<tr>
				<td>Spell Save DC:</td>
				<td>
					DC {8 + $characterSheet.proficiencyBonus + $characterSheet.spellCastingAbility}
				</td>
			</tr>
			<tr>
				<td>Spell Attack Bonus:</td>
				<td>
					+{$characterSheet.proficiencyBonus + $characterSheet.spellCastingAbility}
				</td>
			</tr>
			<tr>
				<td>Proficiency Bonus:</td>
				<td>
					+{$characterSheet.proficiencyBonus}
				</td>
			</tr>
			<tr>
				<td>Spellcasting Ability:</td>
				<td>+{$characterSheet.spellCastingAbility}</td>
			</tr>
		</tbody>
	</table>

	<div class="margin padding-small">
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
	</div>
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
