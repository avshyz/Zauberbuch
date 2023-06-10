<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let exact: boolean = false;

	$: isActive = exact ? $page.url.pathname === href : $page.url.pathname.startsWith(href);
</script>

<a {href} aria-current={isActive ? 'page' : undefined}><slot /></a>

<style>
	a[aria-current='page'] {
		color: var(--secondary);
		border-color: var(--secondary);
	}
</style>
