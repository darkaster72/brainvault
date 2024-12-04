<script lang="ts">
	import { searchQuery } from '../../stores/searchStore';
	import Input from './ui/input/input.svelte';

	const handleInput = (value: string) => {
		searchQuery.set(value);
	};
</script>

<Input
	class="w-72"
	placeholder="Search by title"
	oninput={(e) => handleInput((e.target as HTMLInputElement).value)}
></Input>
