import { writable } from 'svelte/store';

const _theme = writable<'light' | 'dark'>('light');

export const theme = {
	subscribe: _theme.subscribe
};

export function toggleTheme() {
	_theme.update((current) => (current === 'light' ? 'dark' : 'light'));
}
