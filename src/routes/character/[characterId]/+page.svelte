<script lang="ts">
	import SpellTable from '$lib/components/SpellTable.svelte';
	import { characterSheet } from '$lib/stores/character.js';
	import { Button } from 'spaper';
	import { loadConfettiPreset } from 'tsparticles-preset-confetti';
	import Particles from 'svelte-particles';
	import type { Container, Options } from 'tsparticles-engine';

	let particlesContainer: Container | undefined;
	let options: Partial<Options> = {
		preset: 'confetti',
		autoPlay: true,
		interactivity: {
			detect_on: 'window',
			events: {
				onClick: {
					enable: true,
					mode: 'emitter'
				}
			}
		}
	};
</script>

<h3 class="margin">Spellbook</h3>

<div class="row flex-edges flex-middle">
	<div class="col">Spell Slots: {$characterSheet.spellSlots}</div>
	<div class="col">
		<Button
			size="small"
			on:click={async (e) => {
				// TODO ADD CONFIRMATION HERE
				characterSheet.actions.rest();
			}}
		>
			Long Rest!
		</Button>
	</div>
</div>

<SpellTable spells={$characterSheet.learnedSpells}>
	<div slot="action" let:spell>
		<Button
			disabled={$characterSheet.spellSlots[spell.level] <= 0}
			size="small"
			on:click={(e) => {
				characterSheet.actions.castSpell(spell);
			}}
		>
			Cast
		</Button>
		<Particles
			{options}
			particlesInit={async (engine) => {
				await loadConfettiPreset(engine);
			}}
			on:particlesLoaded={(event) => {
				particlesContainer = event.detail.particles;
			}}
		/>
	</div>
</SpellTable>
