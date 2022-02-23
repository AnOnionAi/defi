<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let options = [];
	export let selected = 0;

	function setSelected(e) {
		const newValue = Number(e.target.value);

		selected = newValue;

		dispatch('change', { value: newValue });
	}
</script>

<div class=" ml-6 h-8 flex rounded-r-md rounded-l-md bg-white dark:bg-neutral-900 w-72 -mb-1">
	{#each options as option, index}
		<button
			class="{selected === index
				? 'selected'
				: ''}{'  w-24  flex items-center justify-center   dark:text-white overflow-hidden'}"
			value={option.id}
			name={option.name}
			on:click={setSelected}>
			{option.name}
		</button>
	{/each}
</div>

<style>
	button.selected {
		border-bottom: 2px solid palevioletred;
	}
</style>
