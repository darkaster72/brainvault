<script lang="ts">
	import { page } from '$app/stores';
	import { pb } from '$lib';
	import type { Article } from '$lib/types/article';
	import dayjs from 'dayjs';
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
		<div class="flex w-full items-center justify-center">
			<div class="flex flex-col p-4 md:w-2/3 lg:w-1/2">
				<p class="mb-2 text-slate-800">{dayjs(article.created).format('DD MMMM YYYY')}</p>
				<h1 class="mb-4 text-3xl font-bold">{article.title}</h1>
				<span class="mb-2 text-slate-800">
					by <span>{article.url}</span>
				</span>
				<div class="prose justify-center prose-img:mx-auto">{@html article.content}</div>
			</div>
		</div>
	{:else}
		<p>No article found</p>
	{/if}
</main>
