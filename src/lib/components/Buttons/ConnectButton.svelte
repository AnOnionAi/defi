<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { darkMode } from '$lib/stores/dark';
	import { accounts, chainID } from '$lib/stores/MetaMaskAccount';
	import { formatAddress } from '$lib/utils/addressHelpers';
	import { getContext, onMount } from 'svelte';
	import {
		isMetaMaskInstalled,
		goInstallMetamask,
		metaMaskCon
	} from '$lib/utils/metamaskCalls';
	import { POLYGON_CHAIN_ID } from '$lib/config';
	import WrongNetwork from '../Modals/WrongNetwork.svelte';

	const { open } = getContext('simple-modal');

	type MetamaskExtensionStatus = 'checking' | 'isInstalled' | 'notInstalled';

	let isInstalled: MetamaskExtensionStatus = 'checking';

	onMount(() => {
		isInstalled = isMetaMaskInstalled() ? 'isInstalled' : 'notInstalled';
		chainID.subscribe((id) => {
			if (id !== POLYGON_CHAIN_ID && id !== undefined) {
				open(
					WrongNetwork,
					{},
					{
						closeButton: true,
						closeOnEsc: false,
						closeOnOuterClick: false,
						styleWindow: { width: '400px' }
					}
				);
			}
		});
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
	class="rounded-md px-3  hover:bg-green-400 {$accounts &&
		'bg-green-400'} {!$accounts && 'bg-green-600'} {!$darkMode && 'shadow-md'}">
	<p class=" flex items-center font-light text-white ">
		{#if isInstalled == 'checking'}
			{$_('walletStatus.checking')}
		{:else if $accounts}
			<span class="flex items-center">{formatAddress($accounts)}</span>
			<img
				src="/assets/tinyRedMush.png"
				alt="Mush for the family"
				class="w-6 h-6 ml-2" />
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
