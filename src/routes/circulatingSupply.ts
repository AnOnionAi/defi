import { Token } from '$lib/types/types';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { getTokenBalance, getTokenTotalSupply } from '$lib/utils/erc20';
import { ethers } from 'ethers';

//Returns the circulating supply of MushToken.
export const get = async () => {
	const [totalSupply, burnedSupply] = await Promise.all([
		getTokenTotalSupply(getContractAddress(Token.MUSHTOKEN)),
		getTokenBalance(
			getContractAddress(Token.MUSHTOKEN),
			ethers.constants.AddressZero
		)
	]);
	const parsedTotalSupply = parseFloat(ethers.utils.formatEther(totalSupply));
	const parsedBurnedSupply = parseFloat(ethers.utils.formatEther(burnedSupply));
	const circulatingSupply = parsedTotalSupply - parsedBurnedSupply;
	return { status: 200, body: { circulatingSupply: circulatingSupply } };
};
