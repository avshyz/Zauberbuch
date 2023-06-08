<script lang="ts">
	import CharacterForm from '$lib/components/CharacterForm.svelte';
	import { BaseDirectory, writeTextFile, removeFile } from '@tauri-apps/api/fs';
	import type { CharacterSheet } from '$lib/types';
	import { goto } from '$app/navigation';
	import { deleteCharacter, saveCharacter } from '$lib/orm/character.js';
	export let data;

	async function handleSubmit(e: CustomEvent<Omit<CharacterSheet, 'learnedSpells'>>) {
		saveCharacter(
			{
				...e.detail,
				// TODO: find non-relevant spells here?
				learnedSpells:
					e.detail.characterClass !== data.character.characterClass
						? []
						: data.character.learnedSpells
			},
			data.uuid
		);
		goto(`/character/${data.uuid}`, { invalidateAll: true });
	}

	async function handleDelete() {
		const resp = prompt(`You're going to delete ${data.character.name}. Type DELETE to confirm.`);
		if (resp !== 'DELETE') return;

		await deleteCharacter(data.uuid);
		goto('/');
	}
</script>

<h1>Character Settings</h1>

<h2>Edit Character</h2>
<CharacterForm initialValues={data.character} on:submit={handleSubmit} />
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
