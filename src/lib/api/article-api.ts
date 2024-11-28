import { pb } from '$lib/pocketbase';
import type { Article } from '$lib/types/article';

export async function loadArticle(page = 0, limit = 20) {
	return await pb.collection('articles').getList<Article>(page, limit, {
		sort: '-created'
	});
}

export async function saveArticle(article: Partial<Article>) {
	return await pb.collection('articles').create<Article>({ ...article });
}
