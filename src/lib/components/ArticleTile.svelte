<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ArticleView } from '$lib/types/article.svelte';
	import { fade } from 'svelte/transition';
	import * as Card from './ui/card';
	import Checkbox from './ui/checkbox/checkbox.svelte';

	const { article, onSelect }: { article: ArticleView; onSelect?: (value: boolean) => void } =
		$props();

	const handleClick = () => {
		goto(`/articles/${article.id}`);
	};
</script>

<div class=" cursor-pointer hover:bg-gray-100 hover:shadow-lg">
	<div class="flex flex-row gap-4 px-8 py-4">
		<div class="">
			<Checkbox
				size="sm"
				id="checkbox-{article.id}"
				onCheckedChange={onSelect}
				checked={article.selected}
			/>
		</div>
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div class="" onclick={handleClick} role="button">
			<p class="mb-1 text-xs text-gray-800 dark:text-gray-200">
				{article.daysAgo}
				{#if article.isArticleReady}
					<span transition:fade>• {article.timeToRead}</span>
				{/if}
			</p>
			<Card.Title class="text-lg dark:text-gray-100">{article.title}</Card.Title>
			<p class="text-xs text-gray-800/60 dark:text-gray-400" transition:fade>
				{article.formattedByLine}
			</p>
		</div>
	</div>
</div>
