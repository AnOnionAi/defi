import type { BigNumber } from 'ethers';
import { getMasterChefContract } from './contracts';
import { ethers } from 'ethers';

export const deposit = async (pid: number, amount: string, referrer?: string) => {
	if (!referrer) {
		referrer = ethers.constants.AddressZero;
	}
	const mc = getMasterChefContract();
	return await mc.deposit(pid, ethers.utils.parseUnits(amount, 18), referrer);
};

export const withdraw = async (pid: number, amount: string): Promise<BigNumber> => {
	const mc = getMasterChefContract();
	return await mc.withdraw(pid, ethers.utils.parseUnits(amount, 18));
};

export const getRewards = async (pid: number, user: string): Promise<BigNumber> => {
	const mc = getMasterChefContract();
	return await mc.pendingmush(pid, user);
};

export const getStakedTokens = async (pid: number, user: string): Promise<BigNumber> => {
	const mc = getMasterChefContract();
	const [stakedTokens, ...x] = await mc.userInfo(pid, user);
	return stakedTokens;
};
