import { daysAgo, formatUrl } from '$lib/article-utils';
import dayjs from 'dayjs';

export interface Article {
	byline: string;
	content: string;
	content_status: 'loading' | 'loaded' | 'error';
	created: string;
	description: string;
	excerpt: string;
	id: string;
	lang: string;
	length: number;
	notes: string;
	publishedTime: string;
	siteName: string;
	tags: string[];
	title: string;
	updated: string;
	url: string;
	userid: string;
}

export class ArticleView implements Article {
	constructor(private article: Article) {}

	get byline() {
		return this.article.byline;
	}
	get content() {
		return this.article.content;
	}
	get content_status() {
		return this.article.content_status;
	}
	get created() {
		return this.article.created;
	}
	get description() {
		return this.article.description;
	}
	get excerpt() {
		return this.article.excerpt;
	}
	get id() {
		return this.article.id;
	}
	get lang() {
		return this.article.lang;
	}
	get length() {
		return this.article.length;
	}
	get notes() {
		return this.article.notes;
	}
	get publishedTime() {
		return this.article.publishedTime;
	}
	get siteName() {
		return this.article.siteName;
	}
	get tags() {
		return this.article.tags;
	}
	get title() {
		return this.article.title;
	}
	get updated() {
		return this.article.updated;
	}
	get url() {
		return this.article.url;
	}

	get formattedUrl() {
		return formatUrl(this.url);
	}
	get userid() {
		return this.article.userid;
	}
	get timeToRead() {
		return Math.ceil(this.length / 240) + ' min read';
	}

	get isArticleReady() {
		return this.content_status === 'loaded';
	}

	get daysAgo() {
		return daysAgo(this.created);
	}

	get formattedDate() {
		return dayjs(this.created).format('DD MMMM, YYYY');
	}

	get formattedByLine() {
		const byline: string[] = [];
		if (this.byline) {
			byline.push(this.byline);
			byline.push(this.siteName);
		} else {
			byline.push(this.siteName);
			byline.push(this.formattedUrl);
		}

		return byline.filter((e) => !!e).join(' | ');
	}
}
