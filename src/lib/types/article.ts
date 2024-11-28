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
