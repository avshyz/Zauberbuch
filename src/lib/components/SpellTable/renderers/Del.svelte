<script lang="ts">
	import { onMount } from 'svelte';
	import Annotation from 'svelte-rough-notation';
	import { RESULTS } from './utils';

	export let text: string;

	let visible = false;
	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 1000);
	});

	$: isResult = RESULTS.some((k) => text.toLocaleLowerCase().match(k));
</script>

<Annotation bind:visible multiline type="highlight" color={isResult ? 'magenta' : 'yellow'}>
	{text}
</Annotation>
