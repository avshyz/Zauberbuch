<script lang="ts">
	import type { Spell } from '$lib/assets/SrdSpells';
	import SvelteTable from 'svelte-table';

	export let spells: Spell[];
	export let Action: any;
</script>

<SvelteTable
	rows={spells}
	showExpandIcon={true}
	expandSingle={true}
	rowKey="name"
	columns={[
		{
			title: 'Level',
			key: 'level',
			value: (spell) => spell.level,
			sortable: true
		},
		{
			title: 'Name',
			key: 'name',
			value: (spell) => spell.name,
			sortable: true
		},
		{
			title: 'Casting Time',
			key: 'castingTime',
			value: (spell) => spell.casting_time,
			sortable: true
		},
		{
			title: 'Range',
			key: 'range',
			value: (spell) => spell.range,
			sortable: true
		},

		{
			title: 'action',
			key: 'action',
			renderComponent: Action,
			sortable: true
		}
	]}
>
	<svelte:fragment slot="expanded" let:row={spell}>{spell.description}</svelte:fragment>
</SvelteTable>
