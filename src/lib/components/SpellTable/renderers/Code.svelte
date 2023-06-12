<script lang="ts">
	import { onMount } from 'svelte';
	import Annotation from 'svelte-rough-notation';
	import { CONSTRAINTS } from './utils';

	export let text: string;

	$: isConstraint = text.match(CONSTRAINTS);
	let visible = false;
	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 1000);
	});
</script>

<Annotation
	bind:visible
	multiline
	type={isConstraint ? 'circle' : 'underline'}
	color={isConstraint ? 'red' : 'cornflowerblue'}
>
	{text}
</Annotation>
