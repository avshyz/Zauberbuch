<script lang="ts">
	import CharacterForm from '$lib/components/CharacterForm.svelte';
	import type { CharacterSheet } from '$lib/types';
	import { goto } from '$app/navigation';
	import { characterSheet, saveCharacter } from '$lib/stores/character.js';
	import { page } from '$app/stores';

	async function handleDelete() {
		const { characterId } = $page.params;

		const resp = prompt(`You're going to delete ${$characterSheet.name}. Type DELETE to confirm.`);
		if (resp !== 'DELETE') return;
		characterSheet.delete(characterId);
		goto('/');
	}
</script>

<h1>Character Settings</h1>

<h2>Edit Character</h2>
<CharacterForm
	initialValues={$characterSheet}
	on:submit={(e) => {
		const { characterId } = $page.params;
		saveCharacter({ ...e.detail, learnedSpells: $characterSheet.learnedSpells }, characterId);
		goto(`/character/${characterId}`, { invalidateAll: true });
	}}
/>
<button on:click={handleDelete}>DELETE</button>

<style>
	button {
		background: red;
		color: white;
		border: none;
		padding: 0.5rem;
		border-radius: 0.5rem;
		margin-top: 1rem;
	}
</style>
