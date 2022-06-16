import { METAPIXEL_ADDRESS } from '$lib/config';

import { ethers } from 'ethers';
import { mushTokenContract } from '../contracts';

const getJackpot = async (): Promise<string> => {
	const jackpotResponse = await mushTokenContract.balanceOf(METAPIXEL_ADDRESS);
	const jackpot = ethers.utils.formatEther(jackpotResponse);
	return `${jackpot} USDC`;
};

export default getJackpot;
