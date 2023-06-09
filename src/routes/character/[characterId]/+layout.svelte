<script lang="ts">
	import { page } from '$app/stores';
	import { characterSheet } from '$lib/stores/character.js';
	import { Navbar } from 'spaper';
</script>

<h1 class="margin-small">{$characterSheet.name}</h1>

<Navbar border={false}>
	<h3 class="margin-small">
		{$characterSheet.characterClass} - Level {$characterSheet.level}
	</h3>
	<ul class="inline">
		<li><a href={`/character/${$page.params.characterId}/`}>Play</a></li>
		<li><a href={`/character/${$page.params.characterId}/learn`}>Learn Spells</a></li>
		<li><a href={`/character/${$page.params.characterId}/settings`}>Manage</a></li>
	</ul>
</Navbar>

<slot />
