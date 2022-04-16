import { pools } from '$lib/config/constants/pools';
import { Token } from '$lib/types/types';
import { ethers } from 'ethers';
import { getContractAddress } from './addressHelpers';
import { multiCallClient } from './multicall';

const notLoggedUser = {
	poolAllowance: ethers.constants.Zero,
	stakedTokens: ethers.constants.Zero,
	pendingReward: ethers.constants.Zero
};

const fetchPoolUser = async (userAddress: string) => {
	const MASTERCHEF_ADDRESS = getContractAddress(Token.MASTERCHEF);
	console.log('Master Chef', MASTERCHEF_ADDRESS);
	if (!userAddress) {
		return notLoggedUser;
	}
	const tokensOfPools = pools.map((pool) => pool.tokenAddr);

	const [block, balancesAndAllowances] =
		await multiCallClient.getBalancesAndAllowances(
			tokensOfPools,
			userAddress,
			MASTERCHEF_ADDRESS
		);

	console.log(balancesAndAllowances);
};

export default fetchPoolUser;
