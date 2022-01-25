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

<div class="p-5 flex w-full flex flex-col items-center">
	<img src="/upsetMush.png" alt="Upset Mushroom Drawing" class="w-30 mb-3" />
	<h2 class="text-xl text-red-500 font-medium">Wrong Network</h2>
	<p class="text-sm -mt-1">You must change your actual blockchain</p>
	<button
		on:click={handleChainChange}
		class="mt-4 py-2 px-4 bg-green-500 hover:bg-green-400 bg-green-400 rounded-lg text-white text-sm"
		>Change to Polygon</button
	>
</div>
