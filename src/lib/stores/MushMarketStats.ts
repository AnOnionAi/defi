import { ethers } from 'ethers';
import { readable, derived } from 'svelte/store';
import { tokenPrice } from './NativeTokenPrice';
import CappedERC20 from '$lib/config/abi/CappedERC20.json';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/types/types';
import { getProviderSingleton } from '$lib/utils/web3Helpers';
import { BURN_ADDRESS } from '$lib/config';
import type { Readable } from 'svelte/store';
import { getFarmsTVL, getPoolsTVL } from '$lib/utils/getPortfolioValue';

const mushTokenContract = new ethers.Contract(
	getContractAddress(Token.MUSHTOKEN),
	CappedERC20,
	getProviderSingleton()
);

export const totalMushSupply: Readable<number> = readable(
	undefined,
	function start(set) {
		mushTokenContract.totalSupply().then((amountBN) => {
			const mushSupply = parseFloat(ethers.utils.formatEther(amountBN));
			set(mushSupply);
		});
	}
);

export const maxMushSupply: Readable<number> = readable(0, function start(set) {
	mushTokenContract.cap().then((amountBN) => {
		set(parseFloat(ethers.utils.formatEther(amountBN)));
	});
});

export const totalBurnedMush: Readable<number> = readable(
	undefined,
	function start(set) {
		mushTokenContract.balanceOf(BURN_ADDRESS).then((amountBN) => {
			const burnedMUSH = parseFloat(ethers.utils.formatEther(amountBN));
			set(burnedMUSH);
		});
	}
);

export const mushMarketCap = derived(
	[tokenPrice, totalMushSupply],
	([$tokenPrice, $totalMushSupply]) => {
		if (!$tokenPrice || !$totalMushSupply) return undefined;
		const marketCap = $tokenPrice * $totalMushSupply;
		return marketCap;
	}
);

export const poolsTVL: Readable<number> = readable(0, function start(set) {
	getPoolsTVL().then((TVL) => set(TVL));
});

//TODO: Make the farms TVL calculation.
export const farmsTVL: Readable<number> = readable(0, function start(set) {
	getFarmsTVL().then((TVL) => set(TVL));
});

//TODO: Make the vaults TVL calculation.
export const vaultsTVL: Readable<number> = readable(0, function start(set) {
	getPoolsTVL().then((TVL) => set(TVL));
});

export const totalValueLocked = derived(
	[poolsTVL, farmsTVL, vaultsTVL],
	([$poolsTVL, $farmsTVL, $vaultsTVL]) => {
		return $poolsTVL + $farmsTVL + $vaultsTVL;
	}
);
