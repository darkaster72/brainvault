<script lang="ts" module>
	interface SidebarItem {
		title: string;
		url: string;
		items?: {
			title: string;
			url: string;
			isActive?: boolean;
		}[];
	}
	interface SidebarData {
		navMain: SidebarItem[];
	}

	const data: SidebarData = {
		navMain: [
			{
				title: 'Home',
				url: '/'
			},
			{
				title: 'Library',
				url: '/library'
			},
			{
				title: 'Trash',
				url: '/trash'
			},
			{
				title: 'Settings',
				url: '/settings'
			},
			{
				title: 'Help',
				url: '/help'
			}
		]
	};
</script>

<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import GalleryVerticalEnd from 'lucide-svelte/icons/gallery-vertical-end';
	import type { ComponentProps } from 'svelte';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root variant="floating" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<GalleryVerticalEnd class="size-4" />
							</div>
							<div class="flex flex-col gap-0.5 leading-none">
								<span class="font-semibold">Brain Vault</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.Menu class="gap-2">
				{#each data.navMain as mainItem (mainItem.title)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton class="font-medium">
							{#snippet child({ props })}
								<a href={mainItem.url} {...props}>
									{mainItem.title}
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						{#if mainItem.items?.length}
							<Sidebar.MenuSub class="ml-0 border-l-0 px-1.5">
								{#each mainItem.items as item (item.title)}
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton isActive={item.isActive}>
											{#snippet child({ props })}
												<a href={item.url} {...props}>{item.title}</a>
											{/snippet}
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								{/each}
							</Sidebar.MenuSub>
						{/if}
					</Sidebar.MenuItem>
				{/each}
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
