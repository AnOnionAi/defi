import MasterChefABI from '$lib/config/abi/MasterChef.json';
import MiniChefV2 from '$lib/config/abi/MiniChefV2.json';
import MushTokenABI from '$lib/config/abi/MushToken.json';
import StrategySushiswap from '$lib/config/abi/StrategySushiswap.json';
import ERC20ABI from '$lib/config/abi/ERC20.json';
import pairABI from '$lib/config/abi/IUniswapV2Pair.json';
import routerABI from '$lib/config/abi/IUniswapV2Router02.json';
import factoryABI from '$lib/config/abi/IUniswapV2Factory.json';
import VaultChefABI from '$lib/config/abi/VaultChef.json';
import DividendsABI from '$lib/config/abi/Dividends.json';
import MetapixelABI from '$lib/config/abi/Metapixel.json';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/types/types';
import { BigNumber, ethers } from 'ethers';
import { getSigner } from './web3Utils';
import { METAPIXEL_ADDRESS, MINICHEF_ADDRESS } from '$lib/config';
import { polygonProvider } from './web3Utils';

export const getMasterChefContract = (): ethers.Contract => {
	const masterChefContract = new ethers.Contract(
		getContractAddress(Token.MASTERCHEF),
		MasterChefABI,
		getSigner()
	);
	return masterChefContract;
};

export const getMushTokenContract = (): ethers.Contract => {
	const mushTokenContract = new ethers.Contract(
		getContractAddress(Token.MUSHTOKEN),
		MushTokenABI,
		getSigner()
	);
	return mushTokenContract;
};

export const mushTokenContract = new ethers.Contract(
	getContractAddress(Token.MUSHTOKEN),
	MushTokenABI,
	polygonProvider
);

export const getContractObject = (
	address: string,
	abi: any
): ethers.Contract => {
	const contract = new ethers.Contract(address, abi, getSigner());
	return contract;
};

export const getERC20Contract = (address: string): ethers.Contract => {
	const ercToken = new ethers.Contract(address, ERC20ABI, polygonProvider);
	return ercToken;
};

export const getUniRouterContract = (): ethers.Contract => {
	const router = new ethers.Contract(
		getContractAddress(Token.UNIROUTER),
		routerABI,
		getSigner()
	);
	return router;
};

export const getUniFactoryContract = (): ethers.Contract => {
	const factory = new ethers.Contract(
		getContractAddress(Token.UNIFACTORY),
		factoryABI,
		getSigner()
	);
	return factory;
};

export const getLiquidityPairContract = (address: string): ethers.Contract => {
	const provider = new ethers.providers.JsonRpcProvider(
		'https://polygon-rpc.com/'
	);
	const univ2Pair = new ethers.Contract(address, pairABI, provider);
	return univ2Pair;
};

export const getMushAllowance = async (
	userAddr: string
): Promise<BigNumber> => {
	const mushContract = new ethers.Contract(
		getContractAddress(Token.MUSHTOKEN),
		ERC20ABI,
		getSigner()
	);
	return await mushContract.allowance(
		userAddr,
		'0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
	);
};

export const getTokenAllowance = async (
	tknAddr: string,
	spenderAddr: string,
	userAddr: string
): Promise<BigNumber> => {
	const tokenContract = new ethers.Contract(tknAddr, ERC20ABI, getSigner());
	return await tokenContract.allowance(userAddr, spenderAddr);
};

export const approveToken = async (
	tknAddr: string,
	spenderAddr: string,
	userAddr: string
) => {
	const tokenContract = new ethers.Contract(tknAddr, ERC20ABI, getSigner());
	return await tokenContract.approve(spenderAddr, userAddr);
};

export const isApproved = (allowance: BigNumber): boolean => {
	return allowance._hex !== ethers.constants.Zero._hex;
};

export const addLiquidityPool = async (
	tokenA: string,
	tokenB: string,
	amountA: BigNumber,
	amountB: BigNumber,
	amountAmin: BigNumber,
	amountBmin: BigNumber,
	to: string,
	deadline: string
) => {
	const router = getUniRouterContract();
	await router.addLiquidity(
		tokenA,
		tokenB,
		amountA,
		amountB,
		amountAmin,
		amountBmin,
		to,
		deadline
	);
};

export const getTokenPairAddress = async (
	tkn0Addr: string,
	tkn1Addr: string
): Promise<string> => {
	const factory = getUniFactoryContract();
	return await factory.getPair(tkn0Addr, tkn1Addr);
};

export const getVaultChefContract = (): ethers.Contract => {
	const vaultChefContract = new ethers.Contract(
		getContractAddress(Token.VAULTCHEF),
		VaultChefABI,
		getSigner()
	);
	return vaultChefContract;
};

export const vaultChef = new ethers.Contract(
	getContractAddress(Token.VAULTCHEF),
	VaultChefABI,
	polygonProvider
);

export const getMushStrategyContract = (): ethers.Contract => {
	const dividendsContract = new ethers.Contract(
		getContractAddress(Token.DIVIDENDS),
		DividendsABI,
		getSigner()
	);

	return dividendsContract;
};

export const miniChefV2 = new ethers.Contract(
	MINICHEF_ADDRESS,
	MiniChefV2,
	polygonProvider
);

export const getSushiswapStrategyContract = (strategyAddress: string) => {
	return new ethers.Contract(
		strategyAddress,
		StrategySushiswap,
		polygonProvider
	);
};

export const metapixelContract = new ethers.Contract(
	METAPIXEL_ADDRESS,
	MetapixelABI,
	polygonProvider
);
