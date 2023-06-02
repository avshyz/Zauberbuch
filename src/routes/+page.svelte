<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>Character selection screen!</h1>

<ul>
	{#each data.characters as c}
		<li><a href={`/character/${c.id}`}>{c.name}</a></li>
	{/each}
	<li><a href="/character/new">NEW CHARACTER</a></li>
</ul>
