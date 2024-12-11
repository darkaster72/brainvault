<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Plus from 'lucide-svelte/icons/plus';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from './ui/button';
	import * as Form from './ui/form/index.js';

	import { z } from 'zod';
	import { Input } from './ui/input';

	let open = $state(false);

	const { onAdd }: { onAdd: (url: string) => void } = $props();

	const formSchema = z.object({
		url: z.string().url()
	});

	const form = superForm(
		{ url: '' },
		{
			SPA: true,
			validators: zodClient(formSchema),
			onUpdate: (values) => {
				onAdd(values.form.data.url);
				open = false;
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button>
			<Plus size="32" />
			<span>Add</span>
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<form use:enhance method="POST">
			<Dialog.Header>
				<Dialog.Title>Add URL for article</Dialog.Title>
			</Dialog.Header>
			<div class="py-4">
				<Form.Field {form} name="url">
					<Form.Control>
						{#snippet children({ props })}
							<Input {...props} bind:value={$formData.url} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<Dialog.Footer>
				<Button type="submit">Add</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
