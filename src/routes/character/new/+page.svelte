<script lang="ts">
	import { goto } from '$app/navigation';
	import { saveCharacter } from '$lib/stores/character';
	import CharacterForm from '$lib/components/CharacterForm.svelte';
	import type { CharacterSheet } from '$lib/types';
</script>

<h1>Character creation screen!</h1>

<CharacterForm
	on:submit={async (e) => {
		await saveCharacter({ ...e.detail, learnedSpellsIds: [] });
		// TODO: Add a toast to show that the character was created
		goto('/');
	}}
/>
