<script lang="ts">
	export let data;
	import { Button, Card } from 'spaper';
</script>

<h1 class="margin-small">Select Character</h1>

<Button size="large" type="primary" class="margin" href="/character/new">NEW CHARACTER</Button>

<div class="wrapper margin">
	{#each data.characters as character, i}
		<Card
			class={`border-${(i % 6) + 1} container container-xs margin-bottom-large`}
			title={character.name}
			subTitle={`${character.characterClass} Level ${character.level}`}
		>
			<Button type="primary" href={`/character/${character.id}`}>Play</Button>
			<Button type="secondary" href={`/character/${character.id}/settings`}>Edit</Button>
		</Card>
	{/each}
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0 20px;
	}

	@media only screen and (max-width: 1000px) {
		.wrapper {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
