import { pools } from '$lib/config/constants/pools';
import { accounts } from '$lib/stores/MetaMaskAccount';
import { Token } from '$lib/types/types';
import { getContractAddress } from './addressHelpers';
import MasterChefABI from '$lib/config/abi/MasterChef.json';
import { multiCallClient } from './multicall';

export const fetchPools = async () => {
	const calls = pools.map((pool) => {
		return {
			target: getContractAddress(Token.MASTERCHEF),
			function: 'poolInfo',
			args: [pool.pid]
		};
	});
	const flatenedCalls = calls.flat();
	console.log(flatenedCalls);

	const [block, response] = await multiCallClient.multiCall(
		MasterChefABI,
		flatenedCalls
	);
	console.log(response);
};
