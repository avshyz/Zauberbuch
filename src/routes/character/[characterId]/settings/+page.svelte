<script lang="ts">
	import CharacterForm from '$lib/components/CharacterForm.svelte';
	import { BaseDirectory, writeTextFile, removeFile } from '@tauri-apps/api/fs';
	import type { PageData } from './$types';
	import type { CharacterSheet } from '$lib/types';
	import { goto } from '$app/navigation';
	export let data: PageData;

	async function handleSubmit(e: CustomEvent<CharacterSheet>) {
		await writeTextFile(`characters/${data.uuid}`, JSON.stringify(e.detail), {
			dir: BaseDirectory.AppConfig
		});
		goto(`/character/${data.uuid}`, { invalidateAll: true });
	}

	async function handleDelete() {
		await removeFile(`characters/${data.uuid}`, {
			dir: BaseDirectory.AppConfig
		});
		goto('/');
	}
</script>

<h1>Character Settings</h1>

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
