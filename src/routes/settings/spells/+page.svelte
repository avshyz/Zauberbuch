<script lang="ts">
	import SpellTable from '$lib/components/SpellTable/Table.svelte';
	import SpellForm from '$lib/components/SpellForm.svelte';
	import { spellStore } from '$lib/stores/spells';
</script>

<h2>Spell Management</h2>

<SpellForm
	on:submit={({ detail: s }) => {
		spellStore.actions.saveSpell(s);
	}}
/>

{#if $spellStore.length}
	<SpellTable spells={$spellStore}>
		<div slot="action" let:spell>
			<button
				class="btn-small btn-danger"
				on:click={async () => {
					const resp = prompt(`You're going to delete ${spell.name}. Type DELETE to confirm.`);
					if (resp === 'DELETE') spellStore.actions.deleteSpell(spell);
				}}
			>
				DELETE
			</button>
		</div>
	</SpellTable>
{/if}
