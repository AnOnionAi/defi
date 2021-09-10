import type { BigNumber } from 'ethers';
import { getMasterChefContract } from './contracts';
import { ethers } from 'ethers';

export const deposit = (pid: number, amount: string, referrer?: string): Promise<any> => {
	if (!referrer) {
		referrer = ethers.constants.AddressZero;
	}
		try {
			const mc = getMasterChefContract(); 
			return mc.deposit(pid, ethers.utils.parseUnits(amount, 18), referrer); 
		} catch (error) {
			console.log(error,"Unable to deposit");
		}
	
	
	 
};

export const withdraw = async (pid: number, amount: string): Promise<any> => {
	const mc = getMasterChefContract();
	try{
		return await mc.withdraw(pid, ethers.utils.parseUnits(amount, 18));
	}catch(e){
		return console.log("Unable to Withdraw")
	}
	
};

export const getRewards = async (pid: number, user: string): Promise<any> => {
	const mc = getMasterChefContract();
	try {
		const reward= await mc.pendingmush(pid, user);
		return reward;
	} catch (error) {
		return "Not Avaliable"
	}
	
};

export const getStakedTokens = async (pid: number, user: string): Promise<any> => {
	const mc = getMasterChefContract();
	try{
		const [stakedTokens, ...x] = await mc.userInfo(pid, user);
		return stakedTokens;

	}catch(e){
		return "Not Avaliable"
	}
};
