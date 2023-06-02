<script lang="ts">
	import CharacterForm from '$lib/components/CharacterForm.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Character Settings</h1>

<CharacterForm initialValues={data.character} />
