import { BLOCK_TIMER } from '$lib/config';
import { ethers } from 'ethers';
import { getSushiswapStrategyContract, miniChefV2 } from './contracts';

export const getSushiPerBlock = async (
	strategyAddress: string
): Promise<number> => {
	const strategy = getSushiswapStrategyContract(strategyAddress);
	const miniChefPoolPid = await strategy.pid();
	const sushiPerSecond = await miniChefV2.sushiPerSecond();
	const { allocPoint } = await miniChefV2.poolInfo(miniChefPoolPid);
	const totalAllocPoint = await miniChefV2.totalAllocPoint();
	const poolPoints = parseInt(allocPoint) / parseInt(totalAllocPoint);
	const parsedSushiPerSecond = parseFloat(
		ethers.utils.formatEther(sushiPerSecond)
	);
	return poolPoints * parsedSushiPerSecond * BLOCK_TIMER;
};
