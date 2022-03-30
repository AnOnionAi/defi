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

<div
	class=" ml-6 -mb-1 flex h-8 w-72 rounded-r-md rounded-l-md bg-white dark:bg-neutral-800">
	{#each options as option, index}
		<button
			class="{selected === index
				? 'selected'
				: ''}{'  flex  w-24 items-center justify-center   overflow-hidden dark:text-white'}"
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
