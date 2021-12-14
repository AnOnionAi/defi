<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { faWallet } from '@fortawesome/free-solid-svg-icons';
	import Icon from 'svelte-fa';
	import { darkMode } from '$lib/stores/dark';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { formatAddress } from '$lib/utils/addressHelpers';
	import { onMount } from 'svelte';
	import { isMetaMaskInstalled, goInstallMetamask, metaMaskCon } from '$lib/utils/metamaskCalls';

	type MetamaskExtensionStatus = 'checking' | 'isInstalled' | 'notInstalled';

	let isInstalled: MetamaskExtensionStatus = 'checking';

	onMount(() => {
		isInstalled = isMetaMaskInstalled() ? 'isInstalled' : 'notInstalled';
	});

	const onClickDispatcher = (status: MetamaskExtensionStatus) => {
		if (status == 'notInstalled') {
			return goInstallMetamask();
		} else if (status == 'isInstalled' && !$accounts) {
			console.log('hey');

			return metaMaskCon();
		} else if (status == 'isInstalled' && $accounts) {
			console.log('TODO: Make a modal for unlogging the user');
		}
	};
</script>

<button
	on:click={() => onClickDispatcher(isInstalled)}
	class="px-3 rounded-md  hover:bg-green-400 {$accounts && 'bg-green-400'} {!$accounts &&
		'bg-green-600'} {!$darkMode && 'shadow-md'}"
>
	<p class=" text-white font-light flex items-center ">
		{#if isInstalled == 'checking'}
			{$_('walletStatus.checking')}
		{:else if $accounts}
			<span class="flex items-center">{formatAddress($accounts)}</span>
			<img src="/tinyRedMush.png" alt="Mush for the family" class="w-6 h-6 ml-2" />
		{:else if isInstalled == 'isInstalled'}
			{$_('dividendsPage.cyw')}
		{:else if isInstalled == 'notInstalled'}
			{$_('walletStatus.install')}
		{/if}
	</p>
</button>

<style>
	button {
		height: 38px;
	}
</style>
