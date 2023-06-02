<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { CHARACTER_CLASSES } from '$lib/consts';
	import type { CharacterSheet } from '$lib/types';
	import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
	import { v4 as uuid } from 'uuid';

	function parseForm(form: HTMLFormElement): CharacterSheet {
		const rawData = new FormData(form);
		const data: any = Object.fromEntries(rawData.entries());
		data['level'] = parseInt(data['level']);
		return data;
	}

	async function handleSubmit(e: SubmitEvent) {
		const data = parseForm(e.target as HTMLFormElement);

		await writeTextFile(`characters/${uuid()}.json`, JSON.stringify(data), {
			dir: BaseDirectory.AppConfig
		});
		// TODO: Add a toast to show that the character was created
		goto('/');
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
		<label for="characterClass">Class</label>
		<select name="characterClass" required>
			{#each CHARACTER_CLASSES as characterClass}
				<option value={characterClass}>{characterClass}</option>
			{/each}
		</select>
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
