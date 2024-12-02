<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/auth.js';
	import RegisterForm from '$lib/components/RegisterForm.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;
	onMount(() => {
		if ($currentUser) {
			goto('/home');
		}
	});
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
	<RegisterForm data={data.form} />
</div>
