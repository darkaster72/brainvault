import { goto } from '$app/navigation';
import { pb } from '$lib/pocketbase';
import { writable } from 'svelte/store';

export const currentUser = writable(pb.authStore.record as User | null);

pb.authStore.onChange(() => {
	const user = pb.authStore.record as User | null;
	if (user == null || user.verified) {
		currentUser.set(user);
	}
});

export function logOut() {
	pb.authStore.clear();
	console.log('Logged out user');
	goto('/login');
}

export interface User {
	avatar: string;
	collectionId: string;
	collectionName: string;
	created: Date;
	email: string;
	emailVisibility: boolean;
	id: string;
	name: string;
	updated: Date;
	username: string;
	verified: boolean;
}
