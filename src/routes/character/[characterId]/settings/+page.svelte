<script lang="ts">
	import CharacterForm from '$lib/components/CharacterForm.svelte';
	import { goto } from '$app/navigation';
	import { characterSheet } from '$lib/stores/character.js';
	import { page } from '$app/stores';
	import { getSpellSlots } from '$lib/spellSlots';

	async function handleDelete() {
		const { characterId } = $page.params;

		const resp = prompt(`You're going to delete ${$characterSheet.name}. Type DELETE to confirm.`);
		if (resp !== 'DELETE') return;
		characterSheet.actions.delete(characterId);
		goto('/');
	}
</script>

<h1>Character Settings</h1>

<h2>Edit Character</h2>
<CharacterForm
	initialValues={$characterSheet}
	on:submit={(e) => {
		const { characterId } = $page.params;
		characterSheet.update((c) => {
			// TODO - make this prettier somehow?
			const res = { ...c, ...e.detail };
			const { characterClass, level } = e.detail;
			if (c.characterClass !== characterClass || c.level !== level) {
				res.spellSlots = getSpellSlots(characterClass, level);
			}
			return res;
		});
		goto(`/character/${characterId}`, { invalidateAll: true });
	}}
/>

<button class="btn-danger" on:click={handleDelete}>DELETE</button>
