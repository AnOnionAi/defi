import type { BigNumber } from 'ethers';
import { getVaultChefContract } from './contracts';
import { ethers } from 'ethers';

export const deposit = async(pid: number, amount: string): Promise<any> => {
	try {
		const vaultChef = getVaultChefContract();
		console.log(await vaultChef)
		const depositAmount = ethers.utils.parseUnits(amount,18)
		console.log(vaultChef.functions)
		console.log(vaultChef.functions.deposit)
		return await vaultChef['deposit(uint256,uint256)'](pid,depositAmount);
	} catch (error) {
		console.log(error, 'Unable to deposit');
	}
};

export const depositTo = async(pid: number, amount: string, to: string): Promise<any> => {
	try {
		const vaultChef = getVaultChefContract();
		return await vaultChef.deposit(pid, ethers.utils.parseUnits(amount, 18), to);
	} catch (error) {
		console.log(error, 'Unable to deposit');
	}
};

export const withdraw = async(pid: number, amount: string): Promise<any> => {
	try {
		const vaultChef = getVaultChefContract();
		console.log(vaultChef)
		const withdrawalAmount = ethers.utils.parseUnits(amount, 18)
		return await vaultChef['withdraw(uint256,uint256)'](pid,withdrawalAmount)
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

export const stakedWantTokens = async(pid: number, userAccount: string):Promise<any> => {
	try{
		const vaultChef = getVaultChefContract();
		return  await vaultChef.stakedWantTokens(pid,userAccount);
	}catch(error){
		console.log(error,'Unable to get userStakedTokens')
	}
};
