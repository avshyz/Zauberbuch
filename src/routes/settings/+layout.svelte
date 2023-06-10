<script>
	import NavLink from '$lib/components/NavLink.svelte';
	import { Navbar } from 'spaper';
</script>

<Navbar class="flex-middle" border={false}>
	<h1 slot="brand">Settings</h1>
	<ul class="inline">
		<li><NavLink href="/settings/" exact>General</NavLink></li>
		<li><NavLink href="/settings/keyboard/">Keyboard Short</NavLink></li>
		<li><NavLink href="/settings/spells/">Spells</NavLink></li>
	</ul>
</Navbar>

<slot />
