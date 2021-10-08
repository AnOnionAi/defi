<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp.js';

	const scrollTop = () => {
		window.scrollTo(0, 0);
	};
</script>

<div class="mx-auto max-w-8xl py-5 rounded-b-lg bg-white flex justify-center items-center">
	<div on:click={scrollTop} class="flex px-5 cursor-pointer">
		<p class="text-xl font-semibold text-gray-500">To Top</p>
		<Fa icon={faChevronUp} size="xs" translateX={0.7} translateY={0.9} color="#737373" />
	</div>
</div>
