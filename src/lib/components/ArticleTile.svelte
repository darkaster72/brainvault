<script lang="ts">
	import { goto } from '$app/navigation';
	import { daysAgo, formatUrl, timeToRead } from '$lib/article-utils';
	import type { Article } from '$lib/types/article';
	import * as Card from './ui/card';

	const { article }: { article: Article } = $props();
	const isArticleLoaded = article.content_status == 'loaded';
	const handleClick = () => {
		goto(`/articles/${article.id}`);
	};

	const byline: string[] = [];
	if (article.byline) {
		byline.push(article.byline);
		byline.push(article.siteName);
	} else {
		byline.push(article.siteName);
		byline.push(formatUrl(article.url));
	}
</script>

<Card.Root onclick={handleClick} class="cursor-pointer">
	<Card.Header>
		<p class="text-sm text-gray-800">
			{daysAgo(article.created)}
			{isArticleLoaded ? ' • ' + timeToRead(article.length) : ''}
		</p>
		<Card.Title class="text-xl">{article.title}</Card.Title>
		<p class="mt-2 text-xs text-gray-800/60">{byline.filter((e) => !!e).join(' | ')}</p>
	</Card.Header>
	<Card.Footer>
		<a href="articles/{article.id}" aria-label="link"></a>
	</Card.Footer>
</Card.Root>
