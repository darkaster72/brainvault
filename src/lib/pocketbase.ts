import { env } from '$env/dynamic/public';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);

export const currentUser = writable(pb.authStore.record);

pb.authStore.onChange((record) => {
	console.log('authStore.onChange', record);
	currentUser.set(pb.authStore.record);
});
