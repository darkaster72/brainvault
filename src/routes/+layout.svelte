<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/auth';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { theme } from '$lib/theme';
	import { onMount } from 'svelte';
	import '../app.css';

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

<Toaster />

<svelte:head>
	<title>BrainVault - Your Knowledge, Vaulted</title>
</svelte:head>

{@render children()}
