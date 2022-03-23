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

	$: modalBackgroundColor = $darkMode ? '#121212' : '#fff';

	onMount(() => {
		isInstalled = isMetaMaskInstalled() ? 'isInstalled' : 'notInstalled';
		chainID.subscribe((id) => {
			if (id !== POLYGON_CHAIN_ID && id !== undefined) {
				open(
					WrongNetwork,
					{},
					{
						closeButton: false,
						closeOnEsc: false,
						closeOnOuterClick: true,
						styleWindow: {
							backgroundColor: modalBackgroundColor,
							width: '400px'
						}
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

{#if isInstalled == 'notInstalled'}
	<button
		class="rounded-full bg-primary-400 px-4 text-sm font-bold  text-white dark:bg-analogPurple-300 dark:hover:bg-analogPurple-400"
		>{$_('walletStatus.install')}</button>
{/if}

{#if isInstalled == 'checking'}
	<button
		class="flex items-center rounded-full bg-primary-400  px-4 text-sm font-bold text-white dark:bg-analogPurple-300">
		<div class="flex items-center justify-center">
			<div
				class="h-4 w-4 animate-spin rounded-full
		border-4 border-solid border-white border-t-transparent" />
		</div>
		<span class="px-2">{$_('walletStatus.checking')}</span></button>
{/if}

{#if isInstalled == 'isInstalled' && !$accounts}
	<button
		class="pressed  rounded-full bg-primary-400 px-4
		 text-sm font-bold text-white transition duration-500 hover:bg-primary-300 dark:bg-analogPurple-300 dark:hover:bg-analogPurple-400 {$darkMode &&
			'pressed-dark'}"
		on:click={() => onClickDispatcher(isInstalled)}
		>{$_('dividendsPage.cyw')}</button>
{/if}

{#if $accounts}
	<button
		class="rounded-full bg-primary-400 px-6 text-sm font-bold text-white  hover:bg-primary-300 dark:bg-analogPurple-300 dark:hover:bg-analogPurple-400"
		>{formatAddress($accounts)}</button>
{/if}

<style>
	button {
		height: 34px;
	}
	.pressed {
		box-shadow: 0 3px rgb(224, 210, 210);
	}

	.pressed:active {
		transform: translateY(1px);
		box-shadow: 0 1px rgb(126, 126, 126);
	}

	.pressed-dark {
		box-shadow: 0 3px rgb(97, 96, 96);
	}

	.pressed-dark:active {
		transform: translateY(1px);
		box-shadow: 0 1px rgb(26, 26, 26);
	}
</style>
