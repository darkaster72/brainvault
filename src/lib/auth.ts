import { pb } from '$lib/pocketbase';
import { writable } from 'svelte/store';

export const currentUser = writable(pb.authStore.record as User);

pb.authStore.onChange((record) => {
	console.log('authStore.onChange', record);
	currentUser.set(pb.authStore.record as User);
});

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
