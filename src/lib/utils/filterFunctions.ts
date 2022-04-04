import type { VaultFilterFunction, VaultState } from '$lib/types/types';

export const hideZeroBalancesFilter = (vault: VaultState): boolean => {
	return vault.userWalletBalance != 0;
};

export const stakedOnlyFilter = (vault: VaultState): boolean => {
	return vault.stakedAmount != 0;
};

export const quickswapOnlyFilter = (vault: VaultState): boolean => {
	return vault.platform.name.toLowerCase() == 'quickswap';
};

export const sushiswapOnlyFilter = (vault: VaultState): boolean => {
	return vault.platform.name.toLowerCase() == 'sushiswap';
};

export const generateRandomBalance = (): number => {
	const seed = Math.random();
	return seed < 0.7 ? 0 : Math.random() * 3;
};

/**
 * Get the APR value in %
 * @param filterList An array of filters: functions that returns a boolean
 * @param vault A vault from the list of vaults.
 * @returns true if the vault satisfies all the filter's criterias whitin the Array of Filters
 */
export const reduceFilters = (
	filterList: Array<VaultFilterFunction>,
	vault: VaultState
): boolean => {
	return filterList
		.map((vaultFilter) => vaultFilter.filterFunction(vault))
		.reduce((prev, actual) => prev && actual);
};
