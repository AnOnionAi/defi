<script lang="ts">
	import { darkMode } from '$lib/stores/dark';

	export let title: string;
</script>

<h2
	class="mt-8 mb-5 w-full select-none px-5 text-center  text-4xl font-bold dark:text-white md:text-5xl lg:text-left  {$darkMode
		? 'strokeBlack'
		: 'strokeWhite'}">
	{title}
</h2>

<style>
	.strokeBlack {
		-webkit-text-stroke-width: 1px;
		-webkit-text-stroke-color: black;
	}

	.strokeWhite {
		-webkit-text-stroke-width: 1.5px;
		-webkit-text-stroke-color: white;
	}
</style>
