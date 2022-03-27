<script lang="ts">
	export let placeholder;
	export let inputValue;
	export let handleInput;

	import Fa from 'svelte-fa';
	import { faSearch } from '@fortawesome/free-solid-svg-icons';
</script>

<div
	class="flex h-[36px] w-[120px]  items-center justify-center rounded-lg border-primary-400 bg-gray-100 px-2 text-gray-500 	
	 dark:border-analogPurple-300 dark:bg-neutral-700   dark:text-gray-400 	md:w-[200px]">
	<input
		bind:value={inputValue}
		on:input={handleInput}
		{placeholder}
		type="text"
		class="peer h-full w-full bg-transparent " />
	<div>
		<Fa
			icon={faSearch}
			class="w-4 text-lg peer-focus:text-primary-300 dark:peer-focus:text-analogPurple-300" />
	</div>
</div>
