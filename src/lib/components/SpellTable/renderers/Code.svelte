<script lang="ts">
	import { onMount } from 'svelte';
	import Annotation from 'svelte-rough-notation';
	import { CONDITIONS, CONSTRAINTS, FOLLOWUP, SECONDARY } from './utils';

	export let text: string;

	function getType(text: string) {
		if (text.match(CONSTRAINTS)) return 'constraint';
		if (text.match(CONDITIONS)) return 'condition';
		if (FOLLOWUP.some((m) => text.match(m))) return 'followup';
		if (SECONDARY.some((n) => text.match(n))) return 'secondary';
	}

	const styles: Record<ReturnType<typeof getType>, { type: string; color: string }> = {
		constraint: { type: 'circle', color: 'red' },
		secondary: { type: 'underline', color: 'cornflowerblue' },
		condition: { type: 'box', color: 'magenta' },
		followup: { type: 'bracket', color: 'orange' }
	};

	$: type = getType(text);

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
	type={styles[type].type}
	color={styles[type].color}
	brackets={['left', 'right']}
>
	{text}
</Annotation>
