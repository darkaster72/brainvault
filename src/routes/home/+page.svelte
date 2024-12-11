<script lang="ts">
	import { pb } from '$lib';
	import { deleteArticles, loadArticle, saveArticle } from '$lib/api/article-api';
	import { currentUser } from '$lib/auth';
	import AddUrlDialog from '$lib/components/AddUrlDialog.svelte';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import ArticleTile from '$lib/components/ArticleTile.svelte';
	import SearchActionBox from '$lib/components/SearchActionBox.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { Article } from '$lib/types/article.svelte';
	import { ArticleView } from '$lib/types/article.svelte';
	import { onDestroy, onMount } from 'svelte';

	let articles = $state<ArticleView[]>([]);
	let selectedArticles = $derived(articles.filter((a) => a.selected));
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

	const deleteSelected = async () => {
		try {
			await deleteArticles(...selectedArticles.map((a) => a.id));
			loadArticle({ filter }).then((articleList) => {
				articles = articleList.items;
			});
		} catch (e) {
			console.error(e);
		}
	};

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
	<Sidebar.Provider style="--sidebar-width: 16rem;">
		<AppSidebar />
		<Sidebar.Inset>
			<header class="flex h-16 shrink-0 items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="">
							<SearchActionBox
								actionMode={!!selectedArticles.length}
								articleLength={selectedArticles.length}
								totalArticles={articles.length}
								{deleteSelected}
								selectAll={(value) => articles.forEach((a) => (a.selected = value))}
								bind:value={filter}
								placeholder="Search by Title"
							/>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</header>
			<div class="flex flex-1 flex-col gap-4 px-2 py-4 pt-0 md:px-7">
				<div class="grid divide-y divide-gray-100">
					{#if articles.length === 0}
						<p>No articles yet</p>
					{/if}
					{#each articles as article (article.id)}
						<ArticleTile {article} onSelect={(value) => (article.selected = value)} />
					{/each}
				</div>
			</div>
			<div class="fixed bottom-0 right-0 z-50 m-8">
				<AddUrlDialog onAdd={handleAdd} />
			</div>
		</Sidebar.Inset>
	</Sidebar.Provider>
{/if}
