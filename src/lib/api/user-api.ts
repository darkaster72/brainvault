import { pb } from '$lib/pocketbase';

export async function login({ username, password }: { username: string; password: string }) {
	return await pb.collection('users').authWithPassword(username, password);
}
