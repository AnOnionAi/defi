<script>
	import { goInstallMetamask } from '$lib/utils/metamaskCalls';
</script>

<div class="p-5 flex w-full flex flex-col items-center">
	<img src="/assets/upsetMush.png" alt="Upset Mushroom Drawing" class="w-30 mb-3" />
	<h2 class="text-xl text-red-500 font-medium">Metamask not Installed</h2>
	<p class="text-sm -mt-1">To complete this action you need to have metamask in your browser</p>
	<button
		on:click={goInstallMetamask}
		class="mt-4 py-2 px-4 bg-green-500 hover:bg-green-400 bg-green-400 rounded-lg text-white text-sm"
		>Install Metamask</button
	>
</div>
