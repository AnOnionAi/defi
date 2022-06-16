import BN from 'bignumber.js';
import { getLiquidityPairContract } from '$lib/utils/contracts';
import { ethers } from 'ethers';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

import { Token } from '$lib/types/types';
import { getContractAddress } from '$lib/utils/addressHelpers';

export const error = writable(undefined);
export const tokenPrice: Writable<number> = writable(undefined);

export const fetchNativeTokenPrice = async () => {
	const liquidityPair = getLiquidityPairContract(
		getContractAddress(Token.SUSHILP)
	);
	try {
		const [usdcReserve, mushReserve] = await liquidityPair.getReserves();
		const formattedUsdcReserve = ethers.utils.formatUnits(usdcReserve, 6);
		const formattedMushReserve = ethers.utils.formatUnits(mushReserve, 18);
		const tokenValue = new BN(formattedUsdcReserve).dividedBy(
			formattedMushReserve
		);
		tokenPrice.set(tokenValue.toNumber());
	} catch (e) {
		error.set(e);
		console.log('Error on fetching $MUSH last price :(');
	}
};
