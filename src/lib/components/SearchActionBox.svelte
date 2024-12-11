<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import Trash from 'lucide-svelte/icons/trash-2';
	import Clear from 'lucide-svelte/icons/x';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Checkbox from './ui/checkbox/checkbox.svelte';

	let {
		value = $bindable(),
		class: className,
		actionMode = false,
		articleLength = 0,
		totalArticles = 0,
		selectAll,
		deleteSelected,
		...restProps
	}: WithElementRef<HTMLInputAttributes> & {
		actionMode?: boolean;
		articleLength?: number;
		totalArticles?: number;
		selectAll?: (value: boolean) => void;
		deleteSelected?: () => void;
	} = $props();

	let checked = $derived(articleLength === totalArticles);
</script>

{#if actionMode}
	<div
		class="flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm md:w-96"
	>
		<div class="hidden items-center gap-4 md:flex">
			<Checkbox
				id="select-all-action"
				size="sm"
				onCheckedChange={selectAll}
				indeterminate={articleLength > 0 && articleLength < totalArticles}
				{checked}
			/>
			<p class="">
				<b>{articleLength}</b>&nbsp;items selected
			</p>
		</div>
		<div class="flex items-center gap-2">
			<div
				class="rounded-full p-1.5 transition-all hover:bg-destructive hover:text-destructive-foreground"
			>
				<Trash onclick={() => deleteSelected?.()} class="cursor-pointer" size="20" />
			</div>
			<div class="rounded-full p-1.5 transition-all hover:bg-gray-200 hover:text-primary/80">
				<Clear onclick={() => selectAll?.(false)} class="cursor-pointer" size="22" />
			</div>
		</div>
	</div>
{:else}
	<div class="flex h-10 items-center rounded-md border-none bg-slate-100 px-3 md:w-96">
		<Checkbox
			id="select-all-action"
			size="sm"
			class="hidden md:block"
			onCheckedChange={selectAll}
			{checked}
		/>
		<input
			bind:value
			class={cn(
				'ml-4 mr-2 h-10 w-full rounded-md border-none bg-slate-100 py-2 placeholder:text-muted-foreground focus-visible:outline-none',
				className
			)}
			placeholder="Search by title"
			{...restProps}
		/>
		{#if value}
			<span>
				<Clear onclick={() => (value = '')} class="cursor-pointer" />
			</span>
		{/if}
	</div>
{/if}
