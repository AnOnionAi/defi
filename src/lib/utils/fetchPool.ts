import Multicall from '@indexed-finance/multicall';
import masterChefAbi from '$lib/config/abi/MasterChef.json';
import erc20Abi from '$lib/config/abi/ERC20.json';
import { polygonProvider } from './web3Utils';
import { Token, type CallInput } from '$lib/types/types';
import { getContractAddress } from './addressHelpers';
import { getPriceOfMushPair } from './lpTokenUtils';
import { getPoolTokenPriceUSD } from './coinGecko';
import { ethers, type BigNumber } from 'ethers';
import { getPoolMultiplier, getPoolWeight } from './masterc';

const getStakingTokenPrice = async (tokenAddress: string, isFarm: boolean) => {
	if (isFarm) {
		const stakingTokenPrice = await getPriceOfMushPair(tokenAddress);
		return stakingTokenPrice;
	}
	const stakingTokenPrice = await getPoolTokenPriceUSD(tokenAddress);
	return stakingTokenPrice;
};

interface fetchPoolResponse {
	poolFeePercentage: number | null;
	poolMultiplier: number | null;
	stakingTokenPrice: number | null;
	stakedInPool: number | null;
	poolLiquidity: number | null;
	tokenAllocatedPerBlock: number | null;
}

const fetchMasterChefPool = async (
	pid: number,
	tokenAddress: string,
	isFarm = false
): Promise<fetchPoolResponse> => {
	const multicall = new Multicall(polygonProvider);
	const inputs: Array<CallInput> = [
		{
			interface: erc20Abi,
			target: tokenAddress,
			function: 'decimals',
			args: []
		},
		{
			interface: erc20Abi,
			target: tokenAddress,
			function: 'balanceOf',
			args: [getContractAddress(Token.MASTERCHEF)]
		},
		{
			interface: masterChefAbi,
			target: getContractAddress(Token.MASTERCHEF),
			function: 'poolInfo',
			args: [pid]
		},
		{
			interface: masterChefAbi,
			target: getContractAddress(Token.MASTERCHEF),
			function: 'totalAllocPoint',
			args: []
		},
		{
			interface: masterChefAbi,
			target: getContractAddress(Token.MASTERCHEF),
			function: 'nativePerSecond',
			args: []
		}
	];

	const [
		,
		[
			decimalsResponse,
			balanceOfResponse,
			poolInfoResponse,
			totalAllocPointResponse,
			nativePerSecondResponse
		]
	]: [number, any[]] = await multicall.multiCall(inputs);

	const poolFeePercentage = poolInfoResponse.depositFeeBP * 0.01 ?? null;
	const poolMultiplier = getPoolMultiplier(poolInfoResponse.allocPoint) ?? null;
	const stakingTokenPrice = await getStakingTokenPrice(tokenAddress, isFarm);
	const stakedInPool =
		parseFloat(ethers.utils.formatUnits(balanceOfResponse, decimalsResponse)) ??
		null;
	const poolLiquidity = !isNaN(stakedInPool * stakingTokenPrice)
		? stakedInPool * stakingTokenPrice
		: null;
	const poolWeight =
		getPoolWeight(totalAllocPointResponse, poolInfoResponse.allocPoint) ?? null;
	const mushPerBlock =
		parseFloat(ethers.utils.formatEther(nativePerSecondResponse.mul(3))) ??
		null;
	const tokenAllocatedPerBlock = mushPerBlock * poolWeight.toNumber();

	return {
		poolFeePercentage,
		poolMultiplier,
		stakingTokenPrice,
		stakedInPool,
		poolLiquidity,
		tokenAllocatedPerBlock
	};
};

export default fetchMasterChefPool;
