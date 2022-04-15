import { pools } from '$lib/config/constants/pools';

import { Token } from '$lib/types/types';
import { getContractAddress } from './addressHelpers';
import MasterChefABI from '$lib/config/abi/MasterChef.json';
import { multiCallClient } from './multicall';
import { ethers } from 'ethers';

export const fetchPools = async () => {
	const calls = pools.map((pool) => ({
		target: getContractAddress(Token.MASTERCHEF),
		function: 'poolInfo',
		args: [pool.pid]
	}));

	calls.push({
		target: getContractAddress(Token.MASTERCHEF),
		function: 'nativePerSecond',
		args: []
	});

	calls.push({
		target: getContractAddress(Token.MASTERCHEF),
		function: 'totalAllocPoint',
		args: []
	});

	const [block, batchReponse] = await multiCallClient.multiCall(
		MasterChefABI,
		calls
	);

	const totalAllocPointResponse = batchReponse.pop();
	const totalAllocPoint = Number(totalAllocPointResponse.toString());
	const nativePerSecond = batchReponse.pop();
	const totalTokenPerBlock =
		Number(ethers.utils.formatEther(nativePerSecond)) * 2;
	console.log('Total Alloc Point', totalAllocPoint);
	console.log(totalTokenPerBlock);

	const poolsData = batchReponse.map((response, i) => ({
		depositFeePercentage: response.depositFeeBP / 100,
		stakedInPool: response.lpSupply,
		allocPoint: Number(response.allocPoint.toString()),
		poolMultiplier: Number(response.allocPoint.toString()) / 1000,
		poolWeight: Number(response.allocPoint.toString()) / totalAllocPoint
	}));

	console.log(poolsData);
};
