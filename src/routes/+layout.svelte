<script>
	import NavLink from '$lib/components/NavLink.svelte';
	import { Navbar } from 'spaper';
	import 'normalize.css';
	import 'papercss/dist/paper.min.css';
</script>

<Navbar>
	<h3 slot="brand">Zauberbuch</h3>
	<ul class="inline">
		<li><NavLink exact href="/">Characters</NavLink></li>
		<li><NavLink href="/settings/">Settings</NavLink></li>
	</ul>
</Navbar>

<slot />
