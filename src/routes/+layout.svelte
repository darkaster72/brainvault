<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/auth';
	import { theme } from '$lib/theme';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();
	theme.subscribe((value) => {
		document.documentElement.className = value;
	});

	onMount(() => {
		if (!$currentUser) {
			goto('/login');
		}
	});
</script>

{@render children()}
