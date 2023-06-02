<script lang="ts">
	import { CASTER_TYPES, CHARACTER_CLASSES } from '$lib/consts';
	import type { CharacterSheet } from '$lib/types';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { createEventDispatcher } from 'svelte';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';

	export let initialValues: CharacterSheet | undefined = undefined;
	const dispatch = createEventDispatcher<{ submit: CharacterSheet }>();

	const schema = z.object({
		name: z.string().nonempty(),
		level: z.number().gt(0).lte(20),
		characterClass: z.enum(CHARACTER_CLASSES),
		casterType: z.enum(CASTER_TYPES)
	});

	const { form } = createForm<z.infer<typeof schema>>({
		extend: [validator({ schema }), reporter],
		onSubmit: (value: CharacterSheet) => {
			dispatch('submit', value);
		},
		initialValues
	});
</script>

<form use:form>
	<div>
		<label for="name">Name</label>
		<input name="name" />
		<ValidationMessage for="name" let:messages>
			{messages?.[0] || ''}
		</ValidationMessage>
	</div>
	<div>
		<label for="level">Level</label>
		<input name="level" required type="number" max="20" min="1" />
		<ValidationMessage for="level" let:messages>
			{messages?.[0] || ''}
		</ValidationMessage>
	</div>
	<div>
		<label for="characterClass">Class</label>
		<select name="characterClass" required>
			{#each CHARACTER_CLASSES as characterClass}
				<option value={characterClass}>{characterClass}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="casterType">Caster Type</label>
		<select name="casterType" required>
			<option value="full">Full Caster</option>
			<option value="half" disabled>½ Caster</option>
			<option value="third" disabled>⅓ Caster</option>
		</select>
	</div>

	<button type="submit">Create</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}

	div {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}

	label {
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	input,
	select {
		padding: 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid #ccc;
	}

	button {
		padding: 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid #ccc;
	}
</style>
