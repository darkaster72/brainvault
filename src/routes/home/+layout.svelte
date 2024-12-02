<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/auth';
	import { theme } from '$lib/theme';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const unsubscribe = theme.subscribe((value) => {
			document.documentElement.className = value;
		});

		if (!$currentUser) {
			console.log('redirecting to login');
			goto('/login');
		}

		() => {
			unsubscribe();
		};
	});
</script>

{@render children()}
