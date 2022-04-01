import { BigNumber, ethers } from 'ethers';
import UNIV2ABI from '$lib/config/abi/IUniswapV2Pair.json';
import ERC20ABI from '$lib/config/abi/ERC20.json';
import { getProviderSingleton } from './web3Helpers';
import { getContractAddress } from './addressHelpers';
import { Token } from '$lib/types/types';
import { tokenPrice } from '$lib/stores/NativeTokenPrice';
import {
	getTokenBalance,
	getTokenDecimals,
	getTokenTotalSupply
} from './erc20';
import { getPoolTokenPriceUSD, getTokenPriceUSD } from './coinGecko';

let mushTokenPriceUSD = 0;

tokenPrice.subscribe((tokenPrice) => {
	mushTokenPriceUSD = tokenPrice;
});

const getTokenContract = (address: string) => {
	return new ethers.Contract(address, ERC20ABI, getProviderSingleton());
};

export const getUniPairTokenContract = (address: string): ethers.Contract => {
	return new ethers.Contract(address, UNIV2ABI, getProviderSingleton());
};

export const getPriceOfMushPair = async (address: string): Promise<number> => {
	const mushAddress = getContractAddress(Token.MUSHTOKEN);
	const pairContract = getUniPairTokenContract(address);
	const totalSupply = await pairContract.totalSupply();
	const tokenAddresses = await getTokensFromPair(address);
	const reserves = await pairContract.getReserves();

	const token0 = {
		address: tokenAddresses[0],
		reserve: reserves[0],
		...(await getTokenInformation(tokenAddresses[0]))
	};
	const token1 = {
		address: tokenAddresses[1],
		reserve: reserves[1],
		...(await getTokenInformation(tokenAddresses[1]))
	};

	const mushToken = token0.address == mushAddress ? token0 : token1;

	const mushReserveNumber = parseFloat(
		ethers.utils.formatEther(mushToken.reserve)
	);
	const totalValueOfLiquidityPool = mushReserveNumber * mushTokenPriceUSD * 2;
	const totalSupplyNumber = totalSupply / 1e18;
	const oneLpTokenPrice = totalValueOfLiquidityPool / totalSupplyNumber;
	return oneLpTokenPrice;
};

export const getTokenInformation = async (
	tokenAdress: string
): Promise<{ tokenDecimals: number; tokenSymbol: string }> => {
	const tokenContract = getTokenContract(tokenAdress);
	const decimals = tokenContract.decimals();
	const symbol = tokenContract.name();
	const tokenInfo = await Promise.all([decimals, symbol]);
	return { tokenDecimals: tokenInfo[0], tokenSymbol: tokenInfo[1] };
};

export const getTokensFromPair = async (
	pairAddress
): Promise<Array<string>> => {
	const pairContract = getUniPairTokenContract(pairAddress);
	const tkn0 = pairContract.token0();
	const tkn1 = pairContract.token1();
	return Promise.all([tkn0, tkn1]);
};

export const getParsedLPTokenReserves = async (lpTokenAddress: string) => {
	const lpToken = getUniPairTokenContract(lpTokenAddress);
	const [token0Addres, token1Address] = await getTokensFromPair(lpTokenAddress);
	const [token0Decimals, token1Decimals] = await Promise.all([
		getTokenDecimals(token0Addres),
		getTokenDecimals(token1Address)
	]);
	const reserves: Array<BigNumber> = await lpToken.getReserves();
	const token0ParsedReserves = parseFloat(
		ethers.utils.formatUnits(reserves[0], token0Decimals)
	);
	const token1ParsedReserves = parseFloat(
		ethers.utils.formatUnits(reserves[1], token1Decimals)
	);
	return [token0ParsedReserves, token1ParsedReserves];
};

export const getLPTokenPrice = async (
	lpTokenAddress: string
): Promise<number> => {
	const [token0Address, token1Address] = await getTokensFromPair(
		lpTokenAddress
	);
	const totalSupply = await getTokenTotalSupply(lpTokenAddress);
	const [token0Reserve, token1Reserve] = await getParsedLPTokenReserves(
		lpTokenAddress
	);
	const [token0price, token1Price]: Array<number> = await Promise.all([
		getPoolTokenPriceUSD(token0Address),
		getPoolTokenPriceUSD(token1Address)
	]);
	const parsedTotalSupply = parseFloat(ethers.utils.formatEther(totalSupply));
	const LPTokenPrice =
		(token0Reserve * token0price + token1Reserve * token1Price) /
		parsedTotalSupply;
	return LPTokenPrice;
};
