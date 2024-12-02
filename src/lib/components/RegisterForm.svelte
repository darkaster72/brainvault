<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { pb } from '$lib/pocketbase';
	import type { ClientErrorMap } from '$lib/utils/error-utils';
	import type { ClientResponseError } from 'pocketbase';
	import { type Infer, setError, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { _registerSchema, type RegisterSchema } from '../../routes/register/+page';

	type RegisterFormType = Infer<RegisterSchema>;
	export let data: SuperValidated<RegisterFormType>;
	const form = superForm(data, {
		SPA: true,
		validators: zodClient(_registerSchema),
		async onUpdate({ form }) {
			try {
				await pb.collection('users').create({
					...form.data
				});
				await pb.collection('users').requestVerification(form.data.email);
				goto('/login');
			} catch (error) {
				const clientReponseError = error as ClientResponseError;
				const errorMap = clientReponseError.response.data as ClientErrorMap<RegisterFormType>;
				Object.entries(errorMap).forEach(([key, value]) => {
					setError(form, key as keyof RegisterFormType, value.message);
				});
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Register</Card.Title>
		<Card.Description>Enter your details below to create a new account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form use:enhance method="POST">
			<div class="grid gap-4">
				<Form.Field {form} name="name">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Name</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input {...props} type="email" bind:value={$formData.email} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input {...props} type="password" bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="passwordConfirm">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Confirm Password</Form.Label>
							<Input {...props} type="password" bind:value={$formData.passwordConfirm} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Button type="submit" class="w-full">Register</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/login" class="underline">Login</a>
			</div>
		</form>
	</Card.Content>
</Card.Root>
