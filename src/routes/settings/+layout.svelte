<script>
	import { Navbar } from 'spaper';
</script>

<Navbar class="flex-middle" border={false}>
	<h1 slot="brand">Settings</h1>
	<ul class="inline">
		<li><a href="/settings/">General</a></li>
		<li><a href="/settings/keyboard/">Keyboard Short</a></li>
		<li><a href="/settings/spells/">Spells</a></li>
	</ul>
</Navbar>

<slot />
