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

<div class="buttons-wrapper px-5 flex flex-row">
	{#each options as option, index}
		<button
			class="{selected === index
				? 'selected'
				: ''}{' border border-green-500 py-2 px-3 flex items-center hover:text-white hover:bg-green-400 font-medium dark:text-white'}"
			value={option.id}
			name={option.name}
			on:click={setSelected}
		>
			{option.name}
		</button>
	{/each}
</div>

<style>
	button.selected {
		border-bottom: 3px solid palevioletred;
	}
</style>
