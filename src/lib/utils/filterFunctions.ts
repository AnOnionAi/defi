import type { VaultFilterFunction } from '$lib/ts/types';

export const hideZeroBalancesFilter = (vault) => {
	return vault.userWalletBalance != 0;
};

export const stakedOnlyFilter = (vault) => {
	return vault.stakedAmount != 0;
};

export const quickswapOnlyFilter = (vault) => {
	return vault.platform.name.toLowerCase() == 'quickswap';
};

export const sushiswapOnlyFilter = (vault) => {
	return vault.platform.name.toLowerCase() == 'sushiswap';
};

export const generateRandomBalance = () => {
	const seed = Math.random();
	return seed < 0.7 ? 0 : Math.random() * 3;
};

export const reduceFilters = (filterList: Array<VaultFilterFunction>, vault) => {
	return filterList
		.map((vaultFilter) => vaultFilter.filterFunction(vault))
		.reduce((prev, actual) => prev && actual);
};
