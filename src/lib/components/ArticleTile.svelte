<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ArticleView } from '$lib/types/article';
	import { fade } from 'svelte/transition';
	import * as Card from './ui/card';
	import Checkbox from './ui/checkbox/checkbox.svelte';

	const { article }: { article: ArticleView } = $props();
	let checked = $state(false);

	const handleClick = () => {
		goto(`/articles/${article.id}`);
	};
</script>

<div class=" cursor-pointer hover:bg-gray-100 hover:shadow-lg">
	<div class="flex flex-row gap-4 px-8 py-4">
		<div class="">
			<Checkbox size="sm" id="checkbox-{article.id}" bind:checked />
		</div>
		<div class="" onclick={handleClick}>
			<p class="text-sm text-gray-800 dark:text-gray-200">
				{article.daysAgo}
				{#if article.isArticleReady}
					<span transition:fade>• {article.timeToRead}</span>
				{/if}
			</p>
			<Card.Title class="text-xl dark:text-gray-100">{article.title}</Card.Title>
			<p class="mt-2 text-xs text-gray-800/60 dark:text-gray-400" transition:fade>
				{article.formattedByLine}
			</p>
		</div>
		<div class="">
			<a href="articles/{article.id}" aria-label="link"></a>
		</div>
	</div>
</div>
