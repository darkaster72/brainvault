<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/auth';
	import { onMount } from 'svelte';
	import '../app.css';

	export const ssr = false;

	let { children } = $props();

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		}
	});
</script>

{@render children()}
