<script lang="ts">
	import { darkMode } from '$lib/stores/dark';

	import { goInstallMetamask } from '$lib/utils/metamaskCalls';
</script>

<div
	class="-m-5   flex flex-col items-center rounded-md py-12	  {$darkMode &&
		'bg-neutral-900'}">
	<img
		src="/assets/upsetMush.png"
		alt="Upset Mushroom Drawing"
		class="w-30 mb-3" />
	<h2
		class="text-xl font-medium text-primary-400 {$darkMode &&
			'text-analogPurple-400'}">
		Metamask not Installed
	</h2>
	<p class=" text-sm text-gray-800 {$darkMode && 'text-gray-200'}">
		You must install Metamask first.
	</p>
	<button
		on:click={goInstallMetamask}
		class="mt-4 rounded-lg  {$darkMode
			? 'bg-triadicGreen-700 hover:bg-triadicGreen-800'
			: 'bg-triadicGreen-600 hover:bg-triadicGreen-500'} py-3 px-6  font-medium text-white  "
		>Install Metamask</button>
</div>
