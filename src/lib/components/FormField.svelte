<script lang="ts">
	import { ValidationMessage } from '@felte/reporter-svelte';

	export let name: string;
	export let label: string = name;
</script>

<div class="form-group">
	<label for={name}>{label}</label>
	<slot />
	<ValidationMessage for={name} let:messages>
		{messages?.[0] || ''}
	</ValidationMessage>
</div>

<style>
	label {
		text-transform: capitalize;
	}
</style>
