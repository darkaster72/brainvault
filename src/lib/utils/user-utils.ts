export function abbreviate(name: string): string {
	return name
		.split(' ')
		.map((part) => part.charAt(0))
		.join('');
}
