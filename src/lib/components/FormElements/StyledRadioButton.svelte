<script lang="ts">
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let onChange;
	export let value: string;
	export let optionsGroup;
	export let name;
</script>

<div
	class="relative h-[24px]  w-[24px] rounded-md bg-gray-100 dark:bg-neutral-600">
	<input
		{value}
		{name}
		bind:group={optionsGroup}
		on:change={onChange}
		type="radio"
		class="customCheckbox peer  h-[24px] w-[24px]  cursor-pointer appearance-none" />
	<Fa
		icon={faCheck}
		class="check1 pointer-events-none  absolute top-1 left-1 text-lg text-primary-400 text-opacity-0 transition peer-checked:text-opacity-100 dark:text-analogPurple-300 dark:text-opacity-0 " />
</div>
