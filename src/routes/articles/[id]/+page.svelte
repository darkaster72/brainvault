<script lang="ts">
	import { page } from '$app/stores';
	import { loadArticleById } from '$lib/api/article-api';
	import Loading from '$lib/components/ui/loading/loading-spinner.svelte';
</script>

<header class="dark:bg-gray-900 dark:text-gray-100">
	<a href="/">
		<h1 class="px-4 py-2 text-3xl font-semibold">BrainVault</h1>
	</a>
</header>
<main>
	{#await loadArticleById($page.params.id)}
		<Loading></Loading>
	{:then article}
		<div class="flex w-full items-center justify-center dark:bg-gray-900 dark:text-gray-100">
			<div class="flex flex-col p-4 md:w-2/3 lg:w-1/2">
				<p class="mb-2 text-sm text-slate-800 dark:text-gray-400">
					{article.formattedDate}
					{#if article.isArticleReady}
						• {article.timeToRead}
					{/if}
				</p>
				<h1 class="mb-4 text-3xl font-bold dark:text-gray-100">{article.title}</h1>
				<span class="mb-2 text-sm text-slate-800 dark:text-gray-400">
					{#if article.isArticleReady}
						by <span>{article.byline}, {article.siteName}</span> •
					{/if}
					<a href={article.url} target="_blank" class="underline dark:text-blue-400">See Original</a
					>
				</span>
				<div class="prose justify-center dark:prose-invert prose-img:mx-auto">
					{@html article.content}
				</div>
			</div>
		</div>
	{:catch error}
		<div class="flex w-full items-center justify-center dark:bg-gray-900 dark:text-gray-100">
			<div class="flex flex-col p-4 md:w-2/3 lg:w-1/2">
				<p class="mb-2 text-sm text-slate-800 dark:text-gray-400">
					{error.message}
				</p>
			</div>
		</div>
	{/await}
</main>
