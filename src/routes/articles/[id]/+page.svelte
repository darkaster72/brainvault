<script lang="ts">
	import { page } from '$app/stores';
	import { pb } from '$lib';
	import type { Article } from '$lib/types/article';
	import { onMount } from 'svelte';
	let article: Article | null = $state(null);

	onMount(async () => {
		try {
			article = await pb.collection('articles').getOne<Article>($page.params.id);
		} catch (error) {
			console.error(error);
		}
	});
</script>

<main>
	{#if article}
		<h1>{article.title}</h1>
		<p>{article.content}</p>
	{:else}
		<p>No article found</p>
	{/if}
</main>
