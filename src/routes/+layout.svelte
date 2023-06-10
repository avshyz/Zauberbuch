<script>
	import { Navbar } from 'spaper';
	import 'papercss/dist/paper.min.css';
</script>

<Navbar>
	<h3 slot="brand">Zauberbuch</h3>
	<ul class="inline">
		<li><a href="/">Characters</a></li>
		<li><a href="/settings/">Settings</a></li>
	</ul>
</Navbar>

<slot />
