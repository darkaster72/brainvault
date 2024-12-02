import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { PageLoad } from './$types.js';

export const _registerSchema = z
	.object({
		name: z.string().min(2).max(50),
		email: z.string().email(),
		password: z.string().min(8).max(50),
		passwordConfirm: z.string().min(8).max(50)
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ['confirmPassword'] // path of error
	});

export const load: PageLoad = async () => {
	return {
		form: await superValidate(zod(_registerSchema))
	};
};

export type RegisterSchema = typeof _registerSchema;
