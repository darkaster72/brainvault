<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Checkbox as CheckboxPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import Check from 'lucide-svelte/icons/check';
	import Minus from 'lucide-svelte/icons/minus';
	import { tv } from 'tailwind-variants';

	const styles = tv({
		slots: {
			root: '',
			icon: ''
		},
		variants: {
			size: {
				sm: {
					root: 'size-3',
					icon: 'size-2.5'
				},
				md: {
					root: 'size-4',
					icon: 'size-3.5'
				},
				lg: {
					root: 'size-5',
					icon: 'size-4.5'
				}
			}
		}
	});

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		size = 'md',
		...restProps
	}: WithoutChildrenOrChild<CheckboxPrimitive.RootProps & { size?: 'sm' | 'md' | 'lg' }> = $props();
	let { root, icon } = styles({ size });
</script>

<CheckboxPrimitive.Root
	bind:ref
	class={cn(
		'peer box-content shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[disabled=true]:opacity-50',
		root(),
		className
	)}
	bind:checked
	bind:indeterminate
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		<div class={cn('flex size-4 items-center justify-center text-current', root())}>
			{#if indeterminate}
				<Minus class={icon()} />
			{:else}
				<Check class={cn(icon(), !checked && 'text-transparent')} />
			{/if}
		</div>
	{/snippet}
</CheckboxPrimitive.Root>
