import dayjs from 'dayjs';

export function timeToRead(number: number) {
	return Math.ceil(number / 240) + ' min read';
}

export function daysAgo(date: string) {
	const now = dayjs();
	const inputDate = dayjs(date);
	const diff = [
		{ unit: 'year', value: now.diff(inputDate, 'year') },
		{ unit: 'month', value: now.diff(inputDate, 'month') % 12 },
		{ unit: 'day', value: now.diff(inputDate, 'day') % 30 },
		{ unit: 'hour', value: now.diff(inputDate, 'hour') % 24 },
		{ unit: 'minute', value: now.diff(inputDate, 'minute') % 60 }
	];

	const largestDiff = diff.find(({ value }) => value > 0);

	if (largestDiff) {
		const { unit, value } = largestDiff;
		return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
	}

	return 'just now';
}

export function formatUrl(url: string) {
	let formattedUrl = url.replace(/^https?:\/\/(www\.)?/, '');
	if (formattedUrl.length > 20) {
		formattedUrl = formattedUrl.substring(0, 20) + '...';
	}
	return formattedUrl;
}
