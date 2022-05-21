import { FAM_ADDRESS, METAPIXEL_ADDRESS } from '$lib/config';

import { ethers } from 'ethers';
import { famContract } from '../contracts';

const getJackpot = async (): Promise<string> => {
	const jackpotResponse = await famContract.balanceOf(METAPIXEL_ADDRESS);
	const jackpot = ethers.utils.formatEther(jackpotResponse);
	console.log(jackpot);
	return `${jackpot} FAM`;
};

export default getJackpot;
