import type { BigNumber } from 'ethers';
import { getVaultChefContract } from './contracts';
import { ethers } from 'ethers';

export const deposit = (pid: number, amount: string): Promise<any> => {
	try {
		const vaultChef = getVaultChefContract();
		return vaultChef.deposit(pid, ethers.utils.parseUnits(amount, 18));
	} catch (error) {
		console.log(error, 'Unable to deposit');
	}
};

export const depositTo = (pid: number, amount: string, to: string): Promise<any> => {
	try {
		const vaultChef = getVaultChefContract();
		return vaultChef.deposit(pid, ethers.utils.parseUnits(amount, 18), to);
	} catch (error) {
		console.log(error, 'Unable to deposit');
	}
};

export const withdraw = (pid: number, amount: string): Promise<any> => {
	try {
		const vaultChef = getVaultChefContract();
		return vaultChef.withdraw(pid, ethers.utils.parseUnits(amount, 18));
	} catch (error) {
		console.log(error, 'Unable to deposit');
	}
};

export const withdrawTo = (pid: number, amount: string, to: string): Promise<any> => {
	try {
		const vaultChef = getVaultChefContract();
		return vaultChef.withdraw(pid, ethers.utils.parseUnits(amount, 18));
	} catch (error) {
		console.log(error, 'Unable to deposit');
	}
};
