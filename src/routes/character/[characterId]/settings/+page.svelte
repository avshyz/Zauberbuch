<script lang="ts">
	import CharacterForm from '$lib/components/CharacterForm.svelte';
	import { goto } from '$app/navigation';
	import { characterSheet } from '$lib/stores/character.js';
	import { page } from '$app/stores';
	import { getSpellSlots } from '$lib/mechanics';
</script>

<CharacterForm
	initialValues={characterSheet.actions.getCore()}
	title="Edit Character"
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

<div class="row flex-center">
	<button
		class="btn-danger"
		on:click={() => {
			const { characterId } = $page.params;

			const resp = prompt(
				`You're going to delete ${$characterSheet.name}. Type DELETE to confirm.`
			);
			if (resp !== 'DELETE') return;
			characterSheet.actions.delete(characterId);
			goto('/');
		}}
	>
		DELETE CHARACTER
	</button>
</div>
