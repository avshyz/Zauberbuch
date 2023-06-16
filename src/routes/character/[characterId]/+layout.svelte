<script lang="ts">
	import { page } from '$app/stores';
	import NavLink from '$lib/components/NavLink.svelte';
	import { bothPrepareAndLearnStages } from '$lib/mechanics';
	import { characterSheet } from '$lib/stores/character.js';
	import { Navbar } from 'spaper';
</script>

<h1 class="margin-small">{$characterSheet.name}</h1>

<Navbar border={false}>
	<h3 class="margin-small">
		{$characterSheet.characterClass} - Level {$characterSheet.level}
	</h3>
	<ul class="inline">
		<li><NavLink href={`/character/${$page.params.characterId}/`} exact>Play</NavLink></li>
		{#if bothPrepareAndLearnStages($characterSheet.characterClass)}
			<li>
				<NavLink href={`/character/${$page.params.characterId}/prepare`}>Prepare Spells</NavLink>
			</li>
		{/if}
		<li><NavLink href={`/character/${$page.params.characterId}/learn`}>Learn Spells</NavLink></li>
		<li><NavLink href={`/character/${$page.params.characterId}/settings`}>Manage</NavLink></li>
	</ul>
</Navbar>

<slot />
