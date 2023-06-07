<script lang="ts">
	import { goto } from '$app/navigation';
	import { saveCharacter } from '$lib/orm/character';
	import CharacterForm from '$lib/components/CharacterForm.svelte';
	import type { CharacterSheet } from '$lib/types';

	async function handleSubmit(e: CustomEvent<CharacterSheet>) {
		await saveCharacter(e.detail);
		// TODO: Add a toast to show that the character was created
		goto('/');
	}
</script>

<h1>Character creation screen!</h1>

<CharacterForm on:submit={handleSubmit} />
