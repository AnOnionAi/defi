import { MATIC_PER_BLOCK, MINICHEF_ADDRESS, WMATIC_ADDRESS } from '$lib/config';
import type { VaultInfo } from '$lib/types/types';
import { getPoolTokenPriceUSD } from './coinGecko';
import { getTokenBalance } from './erc20';
import { BLOCKS_PER_YEAR, SUSHI_TOKEN_ADDRESS } from '$lib/config/index';
import { getSushiPerBlock } from './sushiSwapUtils';
import { getLPTokenPrice } from './lpTokenUtils';
import { ethers } from 'ethers';
import { getSushiswapStrategyContract } from './contracts';

const getSushiPoolApr = (
	stakingTokenPrice: number,
	SUSHI_PRICE: number,
	SUSHI_PER_BLOCK: number,
	MATIC_PRICE: number,
	MATIC_PER_BLOCK: number,
	totalStaked: number
): number => {
	const totalRewardPricePerYear =
		(SUSHI_PRICE * SUSHI_PER_BLOCK + MATIC_PRICE * MATIC_PER_BLOCK) *
		BLOCKS_PER_YEAR;
	const totalStakingTokenInPool = stakingTokenPrice * totalStaked;
	const apr = (totalRewardPricePerYear / totalStakingTokenInPool) * 100;
	return apr;
};

export const getVaultAPYandAPR = async (
	vault: VaultInfo
): Promise<{ apy: number; tvl: number }> => {
	const strategyContract = getSushiswapStrategyContract(
		vault.strategyContractAddress
	);
	const stakedInStrategy = await strategyContract.vaultSharesTotal();
	const [totalStaked, lpTokenPrice, sushiPrice, maticPrice, sushiPerBlock] =
		await Promise.all([
			getTokenBalance(vault.pair.pairContract, MINICHEF_ADDRESS),
			getLPTokenPrice(vault.pair.pairContract),
			getPoolTokenPriceUSD(SUSHI_TOKEN_ADDRESS),
			getPoolTokenPriceUSD(WMATIC_ADDRESS),
			getSushiPerBlock(vault.strategyContractAddress)
		]);

	const parsedTotalStaked = parseFloat(ethers.utils.formatEther(totalStaked));
	const parsedStakedInStrategy = parseFloat(
		ethers.utils.formatEther(stakedInStrategy)
	);

	/* 	console.table({
		name: `${vault.pair.token0Name} + ${vault.pair.token1Name}`,
		TVLonMINICHEF: lpTokenPrice * parsedTotalStaked,
		parsedTotalStaked,
		sushiPrice,
		maticPrice,
		lpTokenPrice,
		sushiPerBlock,
		MATIC_PER_BLOCK
	}); */
	const apr = getSushiPoolApr(
		lpTokenPrice,
		sushiPrice,
		sushiPerBlock,
		maticPrice,
		MATIC_PER_BLOCK,
		parsedTotalStaked
	);
	const apyCalc = (1 + apr / 365) ** 365 - 1;
	const apy = isFinite(apyCalc) && !isNaN(apyCalc) ? apyCalc : null;
	const tvl =
		isFinite(parsedStakedInStrategy) && !isNaN(parsedStakedInStrategy)
			? parsedStakedInStrategy * lpTokenPrice
			: null;
	return { apy, tvl };
};
