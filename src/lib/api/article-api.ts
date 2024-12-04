import { pb } from '$lib/pocketbase';
import { ArticleView, type Article } from '$lib/types/article';

export async function loadArticle({ page = 0, limit = 20, filter = '' } = {}) {
	const resultList = await pb.collection('articles').getList<ArticleView>(page, limit, {
		sort: '-created',
		filter: pb.filter('title ~ {:filter} || description ~ {:filter} || siteName ~ {:filter}', {
			filter
		})
	});

	resultList.items = resultList.items.map((article) => new ArticleView(article));
	return resultList;
}

export async function saveArticle(article: Partial<Article>) {
	await pb.collection('articles').create<Article>({ ...article });
}

export async function loadArticleById(id: string) {
	return new ArticleView(
		await pb.collection('articles').getOne<Article>(id, {
			expand: 'slug'
		})
	);
}
