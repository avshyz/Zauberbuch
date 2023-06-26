<script lang="ts">
	import { CHARACTER_CLASSES, type CharacterFormResult } from '$lib/types';
	import { validator } from '@felte/validator-zod';
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { createEventDispatcher } from 'svelte';
	import { reporter } from '@felte/reporter-svelte';
	import { CASTER_TYPE_TO_SLOT_TABLE } from '$lib/mechanics';

	import FormField from './FormField.svelte';

	export let title = 'New Character';
	export let initialValues: CharacterFormResult | undefined = undefined;
	const dispatch = createEventDispatcher<{ submit: CharacterFormResult }>();

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
		characterClass: z.enum(CHARACTER_CLASSES),
		spellCastingAbility: z.number().gte(0).lte(10)
	});

	const { form } = createForm<z.infer<typeof schema>>({
		extend: [validator({ schema }), reporter],
		onSubmit: (value: CharacterFormResult) => {
			dispatch('submit', value);
		},
		initialValues: initialValues ?? {}
	});
</script>

<div class="border paper container container-sm margin-bottom-large margin-top-large">
	<h4 class="margin-bottom-small margin-top-none">{title}</h4>
	<form use:form>
		<FormField name="name" label="Name">
			<input name="name" />
		</FormField>
		<FormField name="level" label="Level">
			<input name="level" required type="number" max="20" min="1" />
		</FormField>
		<FormField name="characterClass" label="Class">
			<select name="characterClass" required>
				{#each optionsToDisplay as characterClass}
					<option disabled={!SUPPORTED_CLASSES.includes(characterClass)} value={characterClass}>
						{characterClass}
					</option>
				{/each}
			</select>
		</FormField>
		<FormField name="spellCastingAbility" label="Spellcasting Ability Modifier">
			<input name="spellCastingAbility" required type="number" max="10" min="0" />
		</FormField>

		<button type="submit">
			{initialValues !== undefined ? 'UPDATE' : 'CREATE'}
		</button>
	</form>
</div>

<style>
	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px 40px;
	}
	select,
	select option {
		text-transform: capitalize;
	}

	button {
		grid-column: span 2;
	}

	input,
	select {
		width: 100%;
	}
</style>
