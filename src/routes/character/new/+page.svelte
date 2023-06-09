<script lang="ts">
	import { goto } from '$app/navigation';
	import { saveCharacter } from '$lib/stores/character';
	import CharacterForm from '$lib/components/CharacterForm.svelte';
	import type { CharacterSheet } from '$lib/types';
	import { getSpellSlots } from '$lib/spellSlots';
</script>

<h1>Character creation screen!</h1>

<CharacterForm
	on:submit={async (e) => {
		await saveCharacter({
			...e.detail,
			learnedSpellsIds: [],
			spellSlots: getSpellSlots(e.detail.characterClass, e.detail.level)
		});
		// TODO: Add a toast to show that the character was created
		goto('/');
	}}
/>
