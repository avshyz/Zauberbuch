<script lang="ts">
	import { goto } from '$app/navigation';
	import { EMPTY_SHEET, saveCharacter } from '$lib/stores/character';
	import CharacterForm from '$lib/components/CharacterForm.svelte';
	import { getSpellSlots } from '$lib/mechanics';
</script>

<h1>Character creation screen!</h1>

<CharacterForm
	on:submit={async (e) => {
		const characterId = await saveCharacter({
			// default empty fields
			...EMPTY_SHEET,
			// filled form fields
			...e.detail,
			// deducted fields
			spellSlots: getSpellSlots(e.detail.characterClass, e.detail.level)
		});
		// TODO: Add a toast to show that the character was created
		goto(`/character/${characterId}/learn`);
	}}
/>
