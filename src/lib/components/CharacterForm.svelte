<script lang="ts">
	import { CHARACTER_CLASSES } from '$lib/consts';
	import type { CharacterSheet } from '$lib/types';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { createEventDispatcher } from 'svelte';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';
	import { CASTER_TYPE_TO_SLOT_TABLE } from '$lib/spellSlots';

	export let initialValues: CharacterSheet | undefined = undefined;
	const dispatch = createEventDispatcher<{ submit: CharacterSheet }>();

	const SUPPORTED_CLASSES = Object.entries(CASTER_TYPE_TO_SLOT_TABLE)
		.filter(([pcClass, slots]) => !!slots)
		.map(([pcClass]) => pcClass);

	const optionsToDisplay = [...CHARACTER_CLASSES].sort((a, b) => {
		const isASupported = SUPPORTED_CLASSES.includes(a);
		const isBSupported = SUPPORTED_CLASSES.includes(b);

		if (isASupported && !isBSupported) return -1;
		if (!isASupported && isBSupported) return 1;
		else return a.localeCompare(b);
	});

	const schema = z.object({
		name: z.string().nonempty(),
		level: z.number().gt(0).lte(20),
		characterClass: z.enum(CHARACTER_CLASSES)
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
			{#each optionsToDisplay as characterClass}
				<option disabled={!SUPPORTED_CLASSES.includes(characterClass)} value={characterClass}>
					{characterClass}
				</option>
			{/each}
		</select>
	</div>

	<button type="submit">{initialValues !== undefined ? 'UPDATE' : 'CREATE'}</button>
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

	select,
	select option {
		text-transform: capitalize;
	}
</style>
