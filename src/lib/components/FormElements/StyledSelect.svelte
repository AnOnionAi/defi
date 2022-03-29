<script lang="ts">
	export let value;
	import Fa from 'svelte-fa';
	import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
</script>

<div
	class="group relative h-[36px] w-[132px] text-sm  text-gray-600 dark:text-gray-200 md:w-[180px] md:text-base">
	<select
		class="h-full w-full appearance-none rounded-lg border-primary-300 bg-gray-100 px-2  dark:border-analogPurple-400 dark:bg-neutral-700  "
		bind:value>
		<slot />
	</select>
	<Fa
		icon={faChevronDown}
		class={'pointer-events-none absolute right-3 top-2 text-lg group-hover:text-primary-300 dark:group-hover:text-analogPurple-300'} />
</div>
