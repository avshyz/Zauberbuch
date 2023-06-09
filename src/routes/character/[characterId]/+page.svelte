<script lang="ts">
	import { characterSheet } from '$lib/stores/character.js';
</script>

<p>Spell Slots: {$characterSheet.spellSlots}</p>
<button
	on:click={() => {
		// TODO ADD CONFIRMATION HERE
		characterSheet.actions.rest();
	}}
>
	rest
</button>

{#each $characterSheet.learnedSpells as spell (spell.name)}
	<p>
		{spell.name}
		{spell.level}
		<button
			on:click={() => {
				characterSheet.actions.castSpell(spell);
			}}
			disabled={$characterSheet.spellSlots[spell.level] <= 0}
		>
			Cast
		</button>
	</p>
{/each}
