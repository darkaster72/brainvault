<script lang="ts" module>
	import AudioWaveform from 'lucide-svelte/icons/audio-waveform';
	import Bookmark from 'lucide-svelte/icons/bookmark';
	import Command from 'lucide-svelte/icons/command';
	import GalleryVerticalEnd from 'lucide-svelte/icons/gallery-vertical-end';
	import House from 'lucide-svelte/icons/house';
	import Layers from 'lucide-svelte/icons/layers';
	import PencilLine from 'lucide-svelte/icons/pencil-line';
	import Trash from 'lucide-svelte/icons/trash';

	// This is sample data.
	const data = {
		teams: [
			{
				name: 'BrainVault',
				logo: GalleryVerticalEnd,
				plan: 'Free Plan'
			},
			{
				name: 'Acme Corp.',
				logo: AudioWaveform,
				plan: 'Startup'
			},
			{
				name: 'Evil Corp.',
				logo: Command,
				plan: 'Free'
			}
		],
		navMain: [
			{
				title: 'Home',
				url: '/',
				icon: House,
				isActive: true
			},
			{
				title: 'Library',
				url: '#',
				icon: Bookmark
			},
			{
				title: 'Subscriptions',
				url: '#',
				icon: Layers
			},
			{
				title: 'Highlights',
				url: '#',
				icon: PencilLine
			},
			{
				title: 'Trash',
				url: '#',
				icon: Trash
			}
		]
	};
</script>

<script lang="ts">
	import { currentUser } from '$lib/auth';
	import NavMain from '$lib/components/nav-main.svelte';
	import NavUser from '$lib/components/nav-user.svelte';
	import TeamSwitcher from '$lib/components/team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<!-- <NavProjects projects={data.projects} /> -->
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={$currentUser} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
