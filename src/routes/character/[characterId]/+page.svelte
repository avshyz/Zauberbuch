<script lang="ts">
	import { FULL_CASTER_SPELL_SLOTS_PER_LEVEL } from '$lib/spellSlots';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>{data.character.name}</h1>
<h2>{data.character.characterClass} - Level {data.character.level}</h2>

<nav>
	<li><a href="settings">Manage Character</a></li>
</nav>

<p>hello marie!</p>
<p>Spell Slots: {data.spellSlots}</p>
