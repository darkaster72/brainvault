<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Input from './ui/input/input.svelte';

	let {
		value = $bindable(),
		class: className,
		...restProps
	}: WithElementRef<HTMLInputAttributes> = $props();
</script>

<Input
	bind:value
	class={cn(
		'w-80 border-none bg-slate-100 focus-visible:ring-0 focus-visible:ring-transparent',
		className
	)}
	placeholder="Search by title"
	{...restProps}
></Input>
