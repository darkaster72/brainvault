<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ArticleView } from '$lib/types/article';
	import * as Card from './ui/card';

	const { article }: { article: ArticleView } = $props();

	const handleClick = () => {
		goto(`/articles/${article.id}`);
	};
</script>

<Card.Root onclick={handleClick} class="cursor-pointer">
	<Card.Header>
		<p class="text-sm text-gray-800">
			{article.daysAgo}
			{#if article.isArticleReady}
				• {article.timeToRead}
			{/if}
		</p>
		<Card.Title class="text-xl">{article.title}</Card.Title>
		<p class="mt-2 text-xs text-gray-800/60">{article.formattedByLine}</p>
	</Card.Header>
	<Card.Footer>
		<a href="articles/{article.id}" aria-label="link"></a>
	</Card.Footer>
</Card.Root>
