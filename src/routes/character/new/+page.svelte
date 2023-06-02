<script lang="ts">
	import { enhance } from '$app/forms';
	import type { CharacterSheet } from '$lib/types';
	import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
	import { v4 as uuidv4 } from 'uuid';

	type CharacterCreationForm = { name: string; level: string; type: 'full' | 'half' | 'third' };

	async function handleSubmit(e: SubmitEvent) {
		const rawData = new FormData(e.target as HTMLFormElement);
		const data = Object.fromEntries(rawData.entries()) as CharacterCreationForm;
		await writeTextFile(`characters/${uuidv4()}.json`, JSON.stringify(data), {
			dir: BaseDirectory.AppConfig
		});
	}
</script>

<h1>Character creation screen!</h1>

<form on:submit|preventDefault={handleSubmit}>
	<div>
		<label for="name">Name</label>
		<input name="name" required />
	</div>
	<div>
		<label for="level">Level</label>
		<input name="level" required type="number" max="20" min="1" />
	</div>
	<div>
		<label for="type">Caster Type</label>
		<select name="type" required>
			<option value="full">Full Caster</option>
			<option value="half" disabled>½ Caster</option>
			<option value="third" disabled>⅓ Caster</option>
		</select>
	</div>

	<button type="submit">Create</button>
</form>
