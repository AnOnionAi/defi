<script lang="ts">
	import { darkMode } from '$lib/stores/dark';

	import {
		requestChainAdd,
		requestChainChange
	} from '$lib/stores/MetaMaskAccount';

	const handleChainChange = async () => {
		try {
			await requestChainChange();
			location.reload();
		} catch (e) {
			await requestChainAdd();
			await requestChainChange();
		}
	};
</script>

<div class:dark={$darkMode} class="flex w-full flex-col items-center p-5">
	<img
		src="/assets/upsetMush.png"
		alt="Upset Mushroom Drawing"
		class="w-30 mb-3" />
	<h2 class="text-xl font-medium text-primary-300 dark:text-analogPurple-300">
		Wrong Network
	</h2>
	<p class="text-sm dark:text-white">You must change your actual blockchain</p>
	<button
		on:click={handleChainChange}
		class="mt-4 rounded-lg bg-triadicGreen-700 py-2 px-4 text-sm text-white hover:bg-triadicGreen-600 dark:bg-triadicGreen-600 dark:hover:bg-triadicGreen-700"
		>Change to Polygon</button>
</div>
