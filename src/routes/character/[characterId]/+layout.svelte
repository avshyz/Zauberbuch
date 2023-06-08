<script lang="ts">
	import { page } from '$app/stores';
	import { characterSheet } from '$lib/stores/character.js';
</script>

<h1>{$characterSheet.name}</h1>
<h2>
	{$characterSheet.characterClass} - Level {$characterSheet.level}
</h2>
<nav>
	<ul>
		<li><a href={`/character/${$page.params.characterId}/`}>Play</a></li>
		<li><a href={`/character/${$page.params.characterId}/settings`}>Manage Character</a></li>
		<li><a href={`/character/${$page.params.characterId}/learn`}>Learn Spells</a></li>
	</ul>
</nav>

<slot />
