<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// TODO - SEPERATE TO DIFFERENT COMPONENT
	export let minSearchQueryLength = 3;
	export let debounceMs = 500;

	const dispatch = createEventDispatcher<{ change: string }>();

	export let value: string = '';
	let timer: NodeJS.Timeout;
	let searchBox: HTMLInputElement;
	$: {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			if (value.length > minSearchQueryLength) {
				dispatch('change', value);
			}
		}, debounceMs);
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'f' && e.ctrlKey) {
			searchBox.focus();
			searchBox.select();
		}
	}}
/>

<input placeholder="Search spell" bind:value bind:this={searchBox} />
