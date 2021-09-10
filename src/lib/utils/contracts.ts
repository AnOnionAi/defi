import MasterChefABI from '../config/abi/MasterChef.json';
import MushTokenABI from '../config/abi/MushToken.json';
import TESTLPABI from '../config/abi/TEST-LP.json';
import ERC20ABI from '../config/abi/ERC20.json';
import pairABI from '../config/abi/IUniswapV2Pair.json';
import routerABI from '../config/abi/IUniswapV2Router02.json';
import factoryABI from '../config/abi/IUniswapV2Factory.json';
import { farms } from '../config/constants/farms';
import  addresses  from '../config/constants/addresses.json';
import { BigNumber, ethers } from 'ethers';
import { getSigner } from './helpers';

export const getMasterChefContract = () => {
	const masterChefContract = new ethers.Contract(
		addresses.MasterChef.TEST,
		MasterChefABI,
		getSigner()
	);
	return masterChefContract;
};

export const getMushTokenContract = () => {
	const mushTokenContract = new ethers.Contract(
		addresses.MushToken.TEST,
		MushTokenABI,
		getSigner()
	);
	return mushTokenContract;
};

export const getZyberTokenContract = () => {
	const zyberTokenContract = new ethers.Contract(
		addresses.ZyberToken.TEST,
		MushTokenABI,
		getSigner()
	);
	return zyberTokenContract;
};

export const getContractObject = (address: string, abi: any) => {
	const contract = new ethers.Contract(address, abi, getSigner());
	return contract;
};

export const getTESTLPContract = () => {
	const LPContract = new ethers.Contract(addresses.TESTLP.TEST, TESTLPABI, getSigner());
	return LPContract;
};


export const getERC20Contract = (address: string) => {
	const ercToken = new ethers.Contract(address, ERC20ABI, getSigner());
	return ercToken;
};

export const getUniRouterContract = () => {
	const router = new ethers.Contract(addresses.UNIRouter.TEST, routerABI, getSigner());
	return router;
};

export const getUniFactoryContract = () => {
	const factory = new ethers.Contract(addresses.UNIFactory.TEST, factoryABI, getSigner());
	return factory;
};

export const getUniPair = (address: string) => {
	const unipair = new ethers.Contract(address, pairABI, getSigner());
	return unipair;
};

export const getMushAllowance = async (userAddr: string) => {
	const mushContract = new ethers.Contract(addresses.MushToken.TEST, ERC20ABI, getSigner());
	return await mushContract.allowance(userAddr, '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506');
};

export const getTokenAllowance = async (tknAddr: string, spenderAddr: string, userAddr: string) => {
	const tokenContract = new ethers.Contract(tknAddr, ERC20ABI, getSigner());
	return await tokenContract.allowance(userAddr, spenderAddr);
};

export const approveToken = async (tknAddr: string, spenderAddr: string, userAddr: string) => {
	const tokenContract = new ethers.Contract(tknAddr, ERC20ABI, getSigner());
	return await tokenContract.approve(spenderAddr, userAddr);
};

export const isApproved = (allowance: BigNumber): Boolean => {
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
	await router.addLiquidity(tokenA, tokenB, amountA, amountB, amountAmin, amountBmin, to, deadline);
};

export const getPoolReserves = async (pairAddr: string): Promise<BigNumber[]> => {
	const pair = getUniPair(pairAddr);
	const { reserve0, reserve1 } = await pair.getReserves();
	return [reserve0, reserve1];
};

export const getTokenPairAddress = async (tkn0Addr: string, tkn1Addr: string) => {
	const factory = getUniFactoryContract();
	return await factory.getPair(tkn0Addr, tkn1Addr);
};
