<script lang="ts">
	import Fa from 'svelte-fa';
	import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp.js';
	const scrollTop = () => {
		window.scrollTo(0, 0);
	};
</script>

<div
	class="max-w-8xl dark:bg-dark-800 mx-auto mb-4 flex items-center justify-center rounded-b-lg bg-white py-3 ">
	<div on:click={scrollTop} class="flex cursor-pointer px-5">
		<p class="text-xl font-semibold text-gray-500">To Top</p>
		<Fa
			icon={faChevronUp}
			size="xs"
			translateX={0.7}
			translateY={0.9}
			color="#737373" />
	</div>
</div>
