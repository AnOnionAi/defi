<script lang="ts">
	export let placeholder;
	export let inputValue;
	export let handleInput;
	let isFocused;
	import Fa from 'svelte-fa';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';

	const focus = () => {
		isFocused = true;
	};

	const focusout = () => {
		isFocused = false;
	};
</script>

<div
	class="w-[132 px] flex	h-[36px]  items-center justify-center rounded-lg border-primary-400 bg-gray-100 px-2 text-gray-500 	
	 dark:border-analogPurple-300 dark:bg-neutral-700   dark:text-gray-400 	md:w-[200px]">
	<input
		on:focus={focus}
		on:focusout={focusout}
		bind:value={inputValue}
		on:input={handleInput}
		{placeholder}
		type="text"
		class=" h-full w-full bg-transparent " />
	<div>
		<Fa
			icon={faSearch}
			class="w-4 text-lg {isFocused &&
				'text-primary-300 dark:text-analogPurple-300'}" />
	</div>
</div>
