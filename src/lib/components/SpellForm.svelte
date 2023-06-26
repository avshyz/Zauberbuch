<script lang="ts">
	import { CHARACTER_CLASSES, SCHOOLS, type Spell } from '$lib/types';
	import { createForm } from 'felte';
	import { createEventDispatcher } from 'svelte';
	import FormField from '$lib/components/FormField.svelte';

	const dispatch = createEventDispatcher<{ submit: Spell }>();
	export let initialValues: Spell | undefined = undefined;

	const { form } = createForm<Spell>({
		onSubmit: (value: Spell) => {
			dispatch('submit', value);
		},
		initialValues: initialValues ?? {}
	});
</script>

<form use:form>
	<FormField name="name">
		<input name="name" required />
	</FormField>

	<div class="secondary-fields">
		<FormField name="level" value="0">
			<input name="level" type="number" min="0" max="9" required />
		</FormField>
		<FormField name="cast">
			<select name="cast" id="cast">
				<option value="action">action</option>
				<option value="reaction">reaction</option>
				<option value="bonus action">bonus action</option>
			</select>
		</FormField>
		<FormField name="range"><input name="range" value="self" /></FormField>
		<FormField name="Components"><input disabled /></FormField>
		<FormField name="duration"><input name="duration" value="instant" /></FormField>
		<FormField name="school">
			<select name="school">
				{#each SCHOOLS as school}
					<option value={school}>
						{school}
					</option>
				{/each}
			</select>
		</FormField>

		<FormField name="characterClass" label="class">
			<select name="characterClass" multiple>
				{#each CHARACTER_CLASSES as characterClass}
					<option value={characterClass}>
						{characterClass}
					</option>
				{/each}
			</select>
		</FormField>

		<FormField name="concentration"><input name="concentration" type="checkbox" /></FormField>
		<FormField name="ritual"><input name="ritual" type="checkbox" /></FormField>
	</div>

	<FormField name="description">
		<textarea rows="10" name="description" required />
	</FormField>

	<div class="footer">
		<FormField name="higher_levels" label="Upcast Info">
			<textarea rows="3" name="higher_levels" />
		</FormField>
		<FormField name="reaction_trigger" label="Reaction Trigger">
			<textarea rows="3" name="reaction_trigger" />
		</FormField>
	</div>
	<button>Submit</button>
</form>

<style>
	.secondary-fields {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
	}
	.footer {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
	}

	textarea {
		width: 100% !important;
	}

	form {
		max-width: 750px;
	}

	select,
	select option {
		text-transform: capitalize;
	}

	input:not([type='checkbox']),
	select {
		width: 100%;
	}

	input[type='checkbox'] {
		display: inline;
	}
</style>
