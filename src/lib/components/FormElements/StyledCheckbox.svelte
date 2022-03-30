<script lang="ts">
	import { faCheck } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let onChange;
</script>

<div
	class="relative h-[24px]  w-[24px] rounded-md bg-gray-200 dark:bg-neutral-600">
	<input
		type="checkbox"
		on:change={onChange}
		class="customCheckbox h-[24px]  w-[24px] cursor-pointer  appearance-none rounded-md border-primary-400  accent-primary-400 dark:border-analogPurple-300 dark:accent-analogPurple-400" />
	<Fa
		icon={faCheck}
		class="check1 pointer-events-none  absolute top-1 left-1 text-lg text-primary-400 text-opacity-0 transition dark:text-analogPurple-300 dark:text-opacity-0 " />
</div>
