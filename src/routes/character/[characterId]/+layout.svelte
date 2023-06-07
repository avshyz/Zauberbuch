<script lang="ts">
	import { page } from '$app/stores';
	export let data;
</script>

<h1>{data.character.name}</h1>
<h2>{data.character.characterClass} - Level {data.character.level}</h2>
<nav>
	<ul>
		<li><a href={`/character/${$page.params.characterId}/`}>Play</a></li>
		<li><a href={`/character/${$page.params.characterId}/settings`}>Manage Character</a></li>
		<li><a href={`/character/${$page.params.characterId}/learn`}>Learn Spells</a></li>
	</ul>
</nav>

<slot />
