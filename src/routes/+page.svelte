<script lang="ts">
	export let data;
	import 'papercss/dist/paper.min.css';
</script>

<h1 class="margin-small">Character selection screen!</h1>

<ul>
	{#each data.characters as c}
		<li><a href={`/character/${c.id}`}>{c.name}</a></li>
	{/each}
	<li><a href="/character/new">NEW CHARACTER</a></li>
</ul>
