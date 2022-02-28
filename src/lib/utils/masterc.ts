import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import { ethersToBigNumber } from './bigNumber';
import { getProviderSingleton } from './web3Helpers';
import MasterChefAbi from '$lib/config/abi/MasterChef.json';
import { getContractAddress } from './addressHelpers';
import { PoolInfoResponse, Token } from '$lib/ts/types';
import { getSigner } from './helpers';

const masterChefContract = new ethers.Contract(
	getContractAddress(Token.MASTERCHEF),
	MasterChefAbi,
	getProviderSingleton()
);

export const getDevAddress = async (): Promise<string> =>
	masterChefContract.devAddress();

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

export const getMushPerBlock = async (): Promise<BigNumber> =>
	masterChefContract.mushPerBlock();

export const owner = async (): Promise<string> => masterChefContract.owner();

export const getPendingMush = async (pid: number): Promise<BigNumber> =>
	masterChefContract.pendingMush(pid);

export const poolExistance = async (): Promise<boolean> =>
	masterChefContract.poolExistance();

export const getPoolInfo = async (pid: number): Promise<PoolInfoResponse> =>
	masterChefContract.poolInfo(pid);

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

export const getTokenPerBlock = async (): Promise<BigNumber> =>
	masterChefContract.mushPerBlock();

export const getVaultAddress = async (): Promise<string> =>
	masterChefContract.vaultAddress();

export const deposit = async (
	pid: number,
	amount: any,
	decimals = 18,
	referrer = ethers.constants.AddressZero
) => {
	return masterChefContract
		.connect(getSigner())
		.deposit(pid, ethers.utils.parseUnits(amount, decimals), referrer);
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

export const getPoolWeight = (
	totalAllocPoints: BigNumber,
	poolAllocPoints: BigNumber
) => {
	const totalAP = ethersToBigNumber(totalAllocPoints);
	const poolAP = ethersToBigNumber(poolAllocPoints);
	const poolWeight = poolAP.div(totalAP);

	return poolWeight;
};

export const getPoolMultiplier = (poolAllocPoints: BigNumber): number => {
	const poolAp = ethersToBigNumber(poolAllocPoints);
	const multiplier = poolAp.toNumber() / 1000;
	return multiplier;
};
