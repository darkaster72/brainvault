import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { PageLoad } from './$types.js';

export const load: PageLoad = async () => {
	return {
		form: await superValidate(zod(_formSchema))
	};
};

export const _formSchema = z.object({
	username: z.string().email(),
	password: z.string().min(8).max(50)
});

export type LoginSchema = typeof _formSchema;
