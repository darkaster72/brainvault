import { pb } from '$lib/pocketbase';
import { ArticleView, type Article } from '$lib/types/article.svelte';

export async function loadArticle({ page = 0, limit = 20, filter = '' } = {}) {
	const resultList = await pb.collection('articles').getList<ArticleView>(page, limit, {
		sort: '-created',
		filter: pb.filter('title ~ {:filter} || excerpt ~ {:filter} || siteName ~ {:filter}', {
			filter
		})
	});

	resultList.items = resultList.items.map((article) => new ArticleView(article));
	return resultList;
}

export async function saveArticle(article: Partial<Article>) {
	await pb.collection('articles').create<Article>({ ...article });
}

export async function deleteArticles(...articleIds: string[]) {
	// const batch = pb.createBatch();
	// articleIds.forEach((id) => batch.collection('articles').update(id, { deleted: true }));
	await Promise.allSettled(
		articleIds.map((id) => pb.collection('articles').update(id, { deleted: true }))
	);
	// return await batch.send();
}

export async function loadArticleById(id: string) {
	return new ArticleView(
		await pb.collection('articles').getOne<Article>(id, {
			expand: 'slug'
		})
	);
}
