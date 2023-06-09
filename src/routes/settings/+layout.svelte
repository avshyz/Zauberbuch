<script>
	import { Navbar } from 'spaper';
</script>

<h1 class="margin-small">Settings</h1>

<Navbar class="margin-small padding-none" split={false} border={false}>
	<ul class="inline">
		<li><a href="/settings/">General</a></li>
		<li><a href="/settings/keyboard/">Keyboard Short</a></li>
		<li><a href="/settings/spells/">Spells</a></li>
	</ul>
</Navbar>

<slot />
