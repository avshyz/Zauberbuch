<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Character Page</h1>

<nav>
	<li><a href="settings">Manage Character</a></li>
</nav>

<p>
	hello marie! This is character No. {$page.params.characterId}
</p>
