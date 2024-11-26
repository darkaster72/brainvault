<script lang="ts">
	import { pb } from '$lib';
	import { currentUser } from '$lib/auth';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Article } from '$lib/types/article';
	import { onMount } from 'svelte';

	let articles: Article[] = $state([]);

	onMount(async () => {
		if ($currentUser) {
			try {
				const articlesList = await pb.collection('articles').getList<Article>();
				articles.push(...articlesList.items);
			} catch (error) {
				console.error(error);
			}
		}
	});
</script>

{#if $currentUser}
	<div class="flex p-4">
		<div class="flex w-full flex-col gap-2">
			{#if articles.length === 0}
				<p>No articles found</p>
			{/if}
			{#each articles as article (article.id)}
				<a href="/articles/{article.id}" class="cursor-pointer">
					<Card.Root>
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
				</a>
			{/each}
		</div>
	</div>
{/if}
