<script lang="ts">
	import { requestChainChange } from '$lib/stores/MetaMaskAccount';

	const handleChainChange = async () => {
		try {
			await requestChainChange();
			location.reload();
		} catch (e) {
			console.log(e);
		}
	};
</script>

<div class="flex flex w-full flex-col items-center p-5">
	<img
		src="/assets/upsetMush.png"
		alt="Upset Mushroom Drawing"
		class="w-30 mb-3" />
	<h2 class="text-xl font-medium text-red-500">Wrong Network</h2>
	<p class="-mt-1 text-sm">You must change your actual blockchain</p>
	<button
		on:click={handleChainChange}
		class="mt-4 rounded-lg bg-green-500 bg-green-400 py-2 px-4 text-sm text-white hover:bg-green-400"
		>Change to Polygon</button>
</div>
