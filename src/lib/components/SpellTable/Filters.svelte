<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let filters = {
		restrained: false,
		blinded: false,
		concentrating: false,
		silenced: false
	} as const;

	const dispatch = createEventDispatcher<{ change: typeof filters }>();

	$: {
		dispatch('change', filters);
	}
</script>

<div class="filter-container">
	{#each Object.keys(filters) as condition}
		<div class="field-container">
			<input id={condition} name={condition} bind:checked={filters[condition]} type="checkbox" />
			<label for={condition}>{condition}</label>
		</div>
	{/each}
</div>

<style>
	.filter-container {
		display: flex;
		gap: 16px;
	}
	.field-container {
		display: flex;
		align-items: center;
		gap: 5px;
	}
</style>
