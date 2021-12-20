import { MasterChef } from '$lib/utils/masterc';
import { ethers } from 'ethers';
import { readable, derived } from 'svelte/store';
import { tokenPrice } from './NativeTokenPrice';
import ERC20ABI from '$lib/config/abi/ERC20.json';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/ts/types';
import { Provider } from '$lib/utils/web3Helpers';
import { BURN_ADDRESS } from '$lib/config';
import type { Readable } from 'svelte/store';

const mushTokenContract = new ethers.Contract(
	getContractAddress(Token.MUSHTOKEN),
	ERC20ABI,
	Provider.getProviderSingleton()
);

export const mushPerBlock: Readable<number> = readable(undefined, function start(set) {
	MasterChef.getMushPerBlock().then((bigNumberResponse) => {
		const mushPerBlock = parseInt(ethers.utils.formatEther(bigNumberResponse));
		set(mushPerBlock);
	});
});

export const totalMushSupply: Readable<number> = readable(undefined, function start(set) {
	mushTokenContract.totalSupply().then((amountBN) => {
		const mushSupply = parseFloat(ethers.utils.formatEther(amountBN));
		set(mushSupply);
	});
});

export const totalBurnedMush: Readable<number> = readable(undefined, function start(set) {
	mushTokenContract.balanceOf(BURN_ADDRESS).then((amountBN) => {
		const burnedMUSH = parseFloat(ethers.utils.formatEther(amountBN));
		set(burnedMUSH);
	});
});

export const mushMarketCap = derived(
	[tokenPrice, totalMushSupply],
	([$tokenPrice, $totalMushSupply]) => {
		const marketCap = $tokenPrice * $totalMushSupply;
		return marketCap;
	}
);
