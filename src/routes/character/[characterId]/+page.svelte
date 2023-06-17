<script lang="ts">
	import type { Spell } from '$lib/types';
	import SpellTable from '$lib/components/SpellTable';
	import { characterSheet } from '$lib/stores/character.js';
	import { Button, Modal } from 'spaper';

	let showCharacterInfo = false;

	function isCantrip(spell: Spell) {
		return spell.level === 0;
	}

</script>

<div class="padding row flex-edges flex-middle">
	<h3 class="margin-none">Spellbook</h3>
	{#if $characterSheet.currentConcentration}
		<div class="row margin-none" style="gap: 8px">
			<h4 class="margin-none">Concentrating on: {$characterSheet.currentConcentration}</h4>
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
		{#if spell.ritual}
			<button
				class="btn-small btn-secondary"
				title="Cast Ritual"
				on:click={() => characterSheet.actions.castSpell(spell, true)}
			>
				R
			</button>
		{/if}
		{#if !$characterSheet.isUnpreparedRitual(spell)}
			<button
				class="btn-small"
				disabled={!isCantrip(spell) && ($characterSheet.getSlotsForSpell(spell) <= 0)}
				class:btn-secondary={isCantrip(spell)}
				class:btn-danger={$characterSheet.isConcentrationBreaking(spell)}
				title={$characterSheet.isConcentrationBreaking(spell)
					? `Already concentrating on: ${$characterSheet.currentConcentration}`
					: null}
				on:click={() => characterSheet.actions.castSpell(spell)}
			>
				Cast {#if !isCantrip(spell)}
					({$characterSheet.getSlotsForSpell(spell)}/{$characterSheet.getMaxAvailableSlotsForSpell(spell)})
				{:else}
					Cantrip
				{/if}
			</button>

			{#if !isCantrip(spell) && $characterSheet.getSlotsForSpell(spell) < $characterSheet.getMaxAvailableSlotsForSpell(spell)}
				<button
					title={`Regain spell slot lvl ${spell.level}`}
					class="btn-small"
					on:click={() => characterSheet.actions.regainSlot(spell.level)}
				>
					⎌
				</button>
			{/if}
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
					{#each Array.from({ length: slot }) as _, j}
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
	.slot-container input {
		display: inline;
	}
</style>
