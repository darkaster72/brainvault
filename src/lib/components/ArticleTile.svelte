<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Article } from '$lib/types/article';
	import * as Card from './ui/card';

	const { article }: { article: Article } = $props();
	const handleClick = () => {
		goto(`/articles/${article.id}`);
	};
</script>

<Card.Root onclick={handleClick} class="cursor-pointer">
	<Card.Header>
		<Card.Title>{article.title}</Card.Title>
	</Card.Header>
	<Card.Content>
		<p>{article.url}</p>
	</Card.Content>
	<Card.Footer>
		<a href="articles/{article.id}" aria-label="link"></a>
	</Card.Footer>
</Card.Root>
