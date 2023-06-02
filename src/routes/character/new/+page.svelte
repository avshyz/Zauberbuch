<script lang="ts">
	import { goto } from '$app/navigation';
	import CharacterForm from '$lib/components/CharacterForm.svelte';
	import type { CharacterSheet } from '$lib/types';
	import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
	import { v4 as uuid } from 'uuid';

	async function handleSubmit(e: CustomEvent<CharacterSheet>) {
		await writeTextFile(`characters/${uuid()}`, JSON.stringify(e.detail), {
			dir: BaseDirectory.AppConfig
		});
		// TODO: Add a toast to show that the character was created
		goto('/');
	}
</script>

<h1>Character creation screen!</h1>

<CharacterForm on:submit={handleSubmit} />
