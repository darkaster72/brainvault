import { goto } from '$app/navigation';
import { pb } from '$lib/pocketbase';
import { writable } from 'svelte/store';

export const currentUser = writable(pb.authStore.record as User);

pb.authStore.onChange(() => {
	currentUser.set(pb.authStore.record as User);
});

export function logOut() {
	pb.authStore.clear();
	goto('/');
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
