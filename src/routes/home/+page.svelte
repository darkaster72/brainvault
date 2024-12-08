<script lang="ts">
	import { goto } from '$app/navigation';
	import { pb } from '$lib';
	import { loadArticle, saveArticle } from '$lib/api/article-api';
	import { currentUser } from '$lib/auth';
	import AddUrlDialog from '$lib/components/AddUrlDialog.svelte';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import ArticleTile from '$lib/components/ArticleTile.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { Article } from '$lib/types/article';
	import { ArticleView } from '$lib/types/article';
	import { onDestroy, onMount } from 'svelte';

	let articles: ArticleView[] = $state([]);
	let unsubscribe: () => void;
	let timeout: number;

	const handleAdd = async (url: string) => {
		try {
			await saveArticle({ url, title: url, userid: $currentUser!.id });
		} catch (e) {
			console.error(e);
		}
	};
	let filter = $state('');

	$effect(() => {
		console.log('Filter changed: ', filter);
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			loadArticle({ filter }).then((articleList) => {
				articles = articleList.items;
			});
		}, 250);
	});

	onMount(async () => {
		if (!$currentUser) {
			console.log('redirecting to login');
			goto('/login');
			return;
		}

		try {
			unsubscribe = await pb
				.collection('articles')
				.subscribe<Article>('*', ({ action, record }) => {
					console.log('Article event: ', action, record);
					if (action == 'create') {
						articles = [new ArticleView(record), ...articles];
					} else if (action == 'update') {
						const index = articles.findIndex((a) => a.id === record.id);
						if (index !== -1) {
							articles[index] = new ArticleView(record);
						}
					} else if (action == 'delete') {
						articles = articles.filter((a) => a.id !== record.id);
					}
				});
		} catch (e) {
			console.error(e);
		}
	});

	onDestroy(() => {
		unsubscribe?.();
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
						<Breadcrumb.Item class="">
							<SearchBox bind:value={filter} placeholder="Search by Title" />
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div class="grid divide-y divide-gray-100">
					{#if articles.length === 0}
						<p>No articles yet</p>
					{/if}
					{#each articles as article (article.id)}
						<ArticleTile {article} />
					{/each}
				</div>
			</div>
			<div class="fixed bottom-0 right-0 z-50 m-8">
				<AddUrlDialog onAdd={handleAdd} />
			</div>
		</Sidebar.Inset>
	</Sidebar.Provider>
{/if}
