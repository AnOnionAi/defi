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

	const poolsData = batchReponse.map((response, i) => {
		const poolAllocPoints = Number(response.allocPoint.toString());
		const tokenPerBlock = isFinite(
			(totalTokenPerBlock * poolAllocPoints) / totalAllocPoint
		)
			? (totalTokenPerBlock * poolAllocPoints) / totalAllocPoint
			: 0;
		const totalStaked = Number(
			ethers.utils.formatUnits(response.lpSupply, pools[i].tokenDecimals)
		);

		return {
			poolMultiplier: Number(response.allocPoint.toString()) / 1000,
			depositFee: response.depositFeeBP / 100,
			tokenPerBlock,
			totalStaked
		};
	});
	console.log('BLOCK IS: ', block);
	return poolsData;
};
