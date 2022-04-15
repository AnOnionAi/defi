import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import MasterChefABI from '$lib/config/abi/MasterChef.json';
import { getContractAddress } from './addressHelpers';
import { Token } from '$lib/types/types';
import { web3Provider, getSigner } from './web3Utils';

export const masterChefContract = new ethers.Contract(
	getContractAddress(Token.MASTERCHEF),
	MasterChefABI,
	web3Provider
);

export const getDevAddress = async (): Promise<string> =>
	masterChefContract.devaddr();

export const getFeeAddress = async (): Promise<string> =>
	masterChefContract.feeAddress();

export const getMultiplier = async (
	from: number,
	to: number
): Promise<BigNumber> => masterChefContract.getMultiplier(from, to);

export const getMarketingAddress = async (): Promise<string> =>
	masterChefContract.marketingAddress();

export const getMushAddress = async (): Promise<string> =>
	masterChefContract.mush();

export const getMushMaxSupply = async (): Promise<BigNumber> =>
	masterChefContract.mushMaxSupply();

export const getMushPerBlock = async (): Promise<BigNumber> => {
	const mushPerSecond: BigNumber = await masterChefContract.nativePerSecond();
	return mushPerSecond.mul(3);
};

export const getMushPerSecond = async (): Promise<BigNumber> =>
	masterChefContract.nativePerSecond();

export const owner = async (): Promise<string> => masterChefContract.owner();

export const getPendingMush = async (
	pid: number,
	userAddress: string
): Promise<BigNumber> => masterChefContract.pendingNative(pid, userAddress);

export const poolExistance = async (): Promise<boolean> =>
	masterChefContract.poolExistance();

export const getPoolInfo = async (pid: number): Promise<any> =>
	masterChefContract.poolInfo(0);

export const getPoolLength = async (): Promise<BigNumber> =>
	masterChefContract.poolLength();

export const getReferralComissionRate = async (): Promise<number> =>
	masterChefContract.referralCommissionRate();

export const getStartBlock = async (): Promise<BigNumber> =>
	masterChefContract.startBlock();

export const getTotalAllocPoints = async (): Promise<BigNumber> =>
	masterChefContract.totalAllocPoint();

export const getUserInfo = async (
	pid: number,
	userAddress: string
): Promise<{ amount: BigNumber; rewardDebt: BigNumber }> =>
	masterChefContract.userInfo(pid, userAddress);

export const getVaultAddress = async (): Promise<string> =>
	masterChefContract.vaultAddress();

export const deposit = async (pid: number, amount: any, decimals = 18) => {
	return masterChefContract
		.connect(getSigner())
		.deposit(pid, ethers.utils.parseUnits(amount, decimals));
};

export const withdraw = async (pid: number, amount: any, decimals = 18) => {
	return masterChefContract
		.connect(getSigner())
		.withdraw(pid, ethers.utils.parseUnits(amount, decimals));
};

export const harvestRewards = async (pid: number) => {
	return masterChefContract
		.connect(getSigner())
		.deposit(pid, ethers.constants.Zero, ethers.constants.AddressZero);
};

export const getStakedTokens = async (
	pid: number,
	userAddress: string
): Promise<BigNumber> => {
	const { amount } = await getUserInfo(pid, userAddress);
	return amount;
};
