<script lang="ts">
	import { currentUser } from '$lib/auth';
</script>

{#if $currentUser}
	<h1>Hello {$currentUser.username}</h1>
{/if}
