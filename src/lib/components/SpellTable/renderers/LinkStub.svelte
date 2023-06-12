<script lang="ts">
	import { onMount } from 'svelte';
	import Annotation from 'svelte-rough-notation';

	export let text: string;

	let visible = false;
	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 1000);
	});
</script>

<Annotation bind:visible type="box" color="var(--secondary)">{text}</Annotation>
