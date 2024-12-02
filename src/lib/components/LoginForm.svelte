<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/api/user-api';
	import { type User } from '$lib/auth';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { pb } from '$lib/pocketbase';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { type Infer, setError, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { _formSchema, type LoginSchema } from '../../routes/login/+page';

	let { data }: { data: SuperValidated<Infer<LoginSchema>> } = $props();
	let needsVerification = $state(false);

	const form = superForm(data, {
		SPA: true,
		validators: zodClient(_formSchema),
		async onUpdate({ form, cancel }) {
			try {
				const response = await login({
					...form.data
				});
				if ((response.record as User).verified) {
					goto('/home');
				} else {
					cancel();
					needsVerification = true;
				}
			} catch (error) {
				setError(form, 'username', 'Invalid username or password');
				setError(form, 'password', 'Invalid username or password');
			}
		}
	});

	const resendVerificationEmail = async () => {
		if (!$formData.username) {
			toast('Enter username');
			setError(data, 'username', 'Invalid username or password');
		} else {
			await pb.collection('users').requestVerification($formData.username);
			toast('Verification email sent');
		}
	};

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

				{#if needsVerification}
					<div transition:fade>
						<Alert.Root variant="destructive">
							<Alert.Description>You must verify before you can login.</Alert.Description>
						</Alert.Root>
						<div class="mt-2 text-center">
							<Button variant="link" type="button" onclick={resendVerificationEmail}
								>Resend Verification Email</Button
							>
						</div>
					</div>
				{/if}
				<Button type="submit" class="w-full">Login</Button>
				<Button variant="outline" class="w-full">Login with Google</Button>
			</div>
			<div class="mt-4 text-center text-sm">
				Don't have an account?
				<a href="/register" class="underline"> Register </a>
			</div>
		</form>
	</Card.Content>
</Card.Root>
