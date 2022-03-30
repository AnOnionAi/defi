<script>
	import { goInstallMetamask } from '$lib/utils/metamaskCalls';
</script>

<div class="flex flex w-full flex-col items-center p-5">
	<img
		src="/assets/upsetMush.png"
		alt="Upset Mushroom Drawing"
		class="w-30 mb-3" />
	<h2 class="text-xl font-medium text-red-500">Metamask not Installed</h2>
	<p class="-mt-1 text-sm">
		To complete this action you need to have metamask in your browser
	</p>
	<button
		on:click={goInstallMetamask}
		class="mt-4 rounded-lg bg-green-500 bg-green-400 py-2 px-4 text-sm text-white hover:bg-green-400"
		>Install Metamask</button>
</div>
