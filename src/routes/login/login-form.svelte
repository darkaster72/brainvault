<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { pb } from '$lib/pocketbase';
	import { type Infer, setError, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { _formSchema, type FormSchema } from './+page';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		SPA: true,
		validators: zodClient(_formSchema),
		async onUpdate({ form }) {
			try {
				await pb.collection('users').authWithPassword(form.data.username, form.data.password);
				goto('/home');
			} catch (error) {
				setError(form, 'username', 'Invalid username or password');
				setError(form, 'password', 'Invalid username or password');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root class="mx-auto max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your details below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<form use:enhance method="POST">
			<div class="grid gap-4">
				<Form.Field {form} name="username">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Username</Form.Label>
							<Input {...props} bind:value={$formData.username} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<div class="flex justify-between">
								<Form.Label>Password</Form.Label>
								<a href="##" class="ml-auto inline-block text-sm underline">
									Forgot your password?
								</a>
							</div>
							<Input {...props} type="password" bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Button type="submit" class="w-full">Login</Button>
				<Button variant="outline" class="w-full">Login with Google</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="##" class="underline"> Sign up </a>
			</div>
		</form>
	</Card.Content>
</Card.Root>
