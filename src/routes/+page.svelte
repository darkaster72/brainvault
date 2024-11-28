<script lang="ts">
	import { loadArticle, saveArticle } from '$lib/api/article-api';
	import { currentUser } from '$lib/auth';
	import AddUrlDialog from '$lib/components/AddUrlDialog.svelte';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import ArticleView from '$lib/components/ArticleTile.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { Article } from '$lib/types/article';
	import { onMount } from 'svelte';

	let articles: Article[] = $state([]);

	const handleAdd = async (url: string) => {
		try {
			const newArticle = await saveArticle({ url, title: url, userid: $currentUser.id });
			articles = [newArticle, ...articles];
		} catch (e) {
			console.error(e);
		}
	};

	onMount(async () => {
		if ($currentUser) {
			try {
				const articleList = await loadArticle();
				articles.push(...articleList.items);
			} catch (e) {
				console.error(e);
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
						<Breadcrumb.Item class="">
							<Input class="w-full" placeholder="Search by title"></Input>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</header>
			<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
				<div class="grid gap-4">
					{#if articles.length === 0}
						<p>No articles found</p>
					{/if}
					{#each articles as article (article.id)}
						<ArticleView {article} />
					{/each}
				</div>
			</div>
			<div class="fixed bottom-0 right-0 z-50 m-8">
				<AddUrlDialog onAdd={handleAdd} />
			</div>
		</Sidebar.Inset>
	</Sidebar.Provider>
{/if}
