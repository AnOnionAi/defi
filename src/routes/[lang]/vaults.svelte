<script context="module" lang="ts">
	export const prerender = false;
	import { _ } from 'svelte-i18n';
	import { setInit } from '$lib/i18n/init';
	export async function load({ page }) {
		const { lang } = page.params;
		return {
			props: { lang }
		};
	}
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';
	import { fade } from 'svelte/transition';
	import { quickVaults, sushiVaults } from '$lib/config/constants/vaults';
	import type { VaultInfo } from '$lib/ts/types';
	export let lang;
	import VaultAccordeon from '$lib/components/Cards/VaultAccordeon.svelte';
	import VaultFilter from '$lib/components/Cards/VaultFilter.svelte';
	import BottomList from '$lib/components/Cards/BottomList.svelte';
	import env from '$lib/env';
	import addresses from '$lib/config/constants/addresses.json';
	import Notifications from 'svelte-notifications';
	import { accounts } from '$lib/stores/MetaMaskAccount';
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';
	import { getTokenBalance, isNotZero } from '$lib/utils/erc20';
	import { stakedWantTokens } from '$lib/utils/vaultChef';
	import { parseBigNumberToString } from '$lib/utils/balanceParsers';
	import { BigNumber } from 'ethers';
	import { isHomescreen } from '$lib/stores/homescreen';

	isHomescreen.update( v => v = false );

	let unsubscribe;

	onMount(() => {
		unsubscribe = accounts.subscribe(async (account) => {
			account && (userAccount = account[0]);
			if (account) {
				for (const vault of allVaults) {
					const balance = await getTokenBalance(vault.pair.pairContract, userAccount);
					if (vault.pid !== -1) {
						const staked = await stakedWantTokens(vault.pid, userAccount);
						vaultsWithBalance.push({ ...vault, balance, staked }); // BigNumber.from('0')
					} else {
						vaultsWithBalance.push({ ...vault, balance });
					}
				}
				filteredVaults = [...vaultsWithBalance];
			}
		});
	});
	onDestroy(() => {});
	const allVaults: VaultInfo[] = [...quickVaults, ...sushiVaults];
	let filteredVaults = [];
	let filteredVaultsPrev = [...filteredVaults];
	let userAccount;
	let vaultsWithBalance = [];

	let platformSelected;
	let platformSelectedPrev;
	let zero;
	let zeroPrev;
	let sortby;
	let sortbyPrev;
	let stakedOnly;
	let stakedOnlyPrev;
	let statement;

	$: {
		if (zeroPrev !== undefined) {
			zeroPrev = zero;
		}

		platformSelectedPrev = platformSelected;

		if (platformSelected !== 'All' && platformSelected !== undefined) {
			if ($accounts && zero) {
				filteredVaults = vaultsWithBalance.filter(
					(vault) => vault.platform.name == platformSelected && isNotZero(vault.balance)
				);
			} else if ($accounts && stakedOnly) {
				filteredVaults = vaultsWithBalance.filter(
					(vault) =>
						vault.platform.name == platformSelected && vault.staked && isNotZero(vault.staked)
				);
			} else {
				filteredVaults = allVaults.filter((vault) => vault.platform.name == platformSelected);
			}
		} else {
			filteredVaults = [...allVaults];
		}
	}

	$: {
		if ($accounts) {
			if (stakedOnly) {
				filteredVaultsPrev = [...filteredVaults];
				if (!zero) {
					filteredVaults = vaultsWithBalance.filter((vault) =>
						vault.staked ? isNotZero(vault.staked) : false
					);
				} else {
					filteredVaults = filteredVaultsPrev.filter((vault) =>
						vault.staked ? isNotZero(vault.staked) : false
					);
				}
			} else {
				if (!zero) {
					filteredVaults = [...filteredVaultsPrev];
				} else {
				}
			}
		} else {
			filteredVaultsPrev = [...filteredVaults];
			if (stakedOnly) {
				filteredVaults = [];
			} else {
				filteredVaults = [...filteredVaultsPrev];
			}
		}
	}

	$: {
		if ($accounts) {
			if (zero) {
				filteredVaultsPrev = [...filteredVaults];
				if (stakedOnly)
					filteredVaults = vaultsWithBalance.filter(
						(vault) =>
							isNotZero(vault.balance) &&
							vault.balance !== 'N/A' &&
							(vault.platform.name === platformSelected || platformSelected === 'All') &&
							(vault.staked ? isNotZero(vault.staked) : false)
					);
				else
					filteredVaults = vaultsWithBalance.filter(
						(vault) =>
							isNotZero(vault.balance) &&
							vault.balance !== 'N/A' &&
							(vault.platform.name === platformSelected || platformSelected === 'All')
					);
			}
		} else {
			if (zero) {
				zeroPrev = zero;
				filteredVaultsPrev = [...filteredVaults];
				filteredVaults = [];
			}
		}
	}

	$: {
		if (!stakedOnly && !zero) {
			if (sortby && sortby !== undefined)
				if (sortby === 'Ascending') {
					filteredVaultsPrev = [...filteredVaults];

					if (platformSelected === 'All') {
						filteredVaults = [...quickVaults, ...sushiVaults].reverse();
					} else if (platformSelected === 'QuickSwap') {
						filteredVaults = [...quickVaults].reverse();
					} else if (platformSelected === 'SushiSwap') {
						filteredVaults = [...sushiVaults].reverse();
					}
				} else if (sortby === 'Descending') {
					if (sortbyPrev === 'Ascending' || sortbyPrev === 'Descending') {
						filteredVaultsPrev = [...filteredVaults];

						if (platformSelected === 'All') {
							filteredVaults = [...quickVaults, ...sushiVaults];
						} else if (platformSelected === 'QuickSwap') {
							filteredVaults = [...quickVaults];
						} else if (platformSelected === 'SushiSwap') {
							filteredVaults = [...sushiVaults];
						}
					} else {
						filteredVaultsPrev = [...filteredVaults];
						filteredVaults = [...allVaults];
					}
				}

			sortbyPrev = sortby;
		}
	}

	$: {
		const keys = ['token0Name', 'token1Name'];
		filteredVaults = allVaults.filter(
			(vault) =>
				keys.some((ex) => new RegExp(statement, 'gi').test(vault['pair'][ex])) &&
				(platformSelected !== 'All' ? vault.platform.name === platformSelected : true)
		);
	}

	const handleStaked = () => {
		stakedOnlyPrev = stakedOnly;
		stakedOnly = !stakedOnly;
	};
</script>

<section class="pb-3 ">
	<br />
	<h1 class="text-dark-200 dark:text-white text-4xl tracking-widest">
		{$_('headers.vaults.text')}
	</h1>

	<div class="pt-10 sideShadow background__lite">
		<div in:fade={{ duration: 600 }}>
			<VaultFilter
				bind:platformSelected
				bind:stakedOnly
				on:staked={handleStaked}
				bind:sortby
				bind:zeroBalance={zero}
				bind:statement
			/>
		</div>

		{#each [...filteredVaults] as vault, index}
			{#if index == 0}
				<VaultAccordeon vaultConfig={vault} hasRoundedBorder={true} />
			{:else}
				<VaultAccordeon vaultConfig={vault} />
			{/if}
		{/each}

		<BottomList />
	</div>
</section>

<style>
	.background__lite {
		background-image: url('/backgrounds/vaultsBackgroundLite.png');
	}
</style>
