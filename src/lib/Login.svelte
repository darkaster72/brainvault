<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';

	let email = '';
	let password = '';

	const login = async () => {
		const resp = await pb.collection('users').authWithPassword(email, password);
		console.log(resp);
	};

	// onMount(() => {
	// 	if (localStorage.getItem('token')) {
	// 		goto('/');
	// 	}
	// });
</script>

<div class="flex h-screen flex-col content-center justify-center">
	{#if $currentUser}
		<p>Signed in as {$currentUser.username}.</p>
	{:else}
		<form on:submit|preventDefault class="mx-auto flex flex-col">
			<label for="email">Email</label>
			<input type="email" id="email" bind:value={email} required />

			<label for="password">Password</label>
			<input type="password" id="password" bind:value={password} required />

			<button type="submit" on:click={login}>Login</button>
		</form>
	{/if}
</div>
