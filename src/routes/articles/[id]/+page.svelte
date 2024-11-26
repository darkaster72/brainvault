<script lang="ts">
	import { page } from '$app/stores';
	import { pb } from '$lib';
	import { timeToRead } from '$lib/article-utils';
	import type { Article } from '$lib/types/article';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	let article: Article | null = $state(null);
	Math.round;

	onMount(async () => {
		try {
			article = await pb.collection('articles').getOne<Article>($page.params.id);
		} catch (error) {
			console.error(error);
		}
	});
</script>

<header>
	<a href="/">
		<h1 class="px-4 py-2 text-3xl font-semibold">BrainVault</h1>
	</a>
</header>
<main>
	{#if article}
		<div class="flex w-full items-center justify-center">
			<div class="flex flex-col p-4 md:w-2/3 lg:w-1/2">
				<p class="mb-2 text-sm text-slate-800">
					{dayjs(article.created).format('DD MMMM, YYYY')} • {timeToRead(article.length)}
				</p>
				<h1 class="mb-4 text-3xl font-bold">{article.title}</h1>
				<span class="mb-2 text-sm text-slate-800">
					by <span>{article.byline}, {article.siteName}</span> •
					<a href={article.url} target="_blank" class="underline">See Original</a>
				</span>
				<div class="prose justify-center prose-img:mx-auto">{@html article.content}</div>
			</div>
		</div>
	{:else}
		<p>No article found</p>
	{/if}
</main>
