<script lang="ts">
	import { pb } from '$lib';
	import { currentUser } from '$lib/auth';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
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
	<Sidebar.Provider style="--sidebar-width: 19rem;">
		<AppSidebar />
		<Sidebar.Inset>
			<header class="flex h-16 shrink-0 items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="#">Building Your Application</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div class="grid auto-rows-min gap-4">
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
		</Sidebar.Inset>
	</Sidebar.Provider>
{/if}
