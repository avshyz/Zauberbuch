<script lang="ts">
	import { onMount } from 'svelte';
	import Annotation from 'svelte-rough-notation';
	import { RESULTS, renderers } from './utils';

	export let text: string;

	let visible = false;
	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 1000);
	});

	$: isResult = RESULTS.some((k) => text.toLocaleLowerCase().match(k));
  const {del, ...normalizedRenderers} = renderers;
</script>

<Annotation bind:visible multiline type="highlight" renderers={normalizedRenderers} color={isResult ? 'magenta' : 'yellow'}>
	{text}
</Annotation>
