<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { theme } from '$lib/theme';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		const unsubscribe = theme.subscribe((value) => {
			document.documentElement.className = value;
		});

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
