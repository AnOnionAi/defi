import type { BigNumber } from 'ethers';
import { getMasterChefContract } from './contracts';
import { ethers } from 'ethers';
import { ethersToBigNumber } from './bigNumber';
import { Provider } from './web3Helpers';
import MasterChefAbi from "$lib/config/abi/MasterChef.json"
import { getContractAddress } from './addressHelpers';
import { Token } from '$lib/ts/types';

export const deposit = (pid: number, amount: string, referrer?: string): Promise<any> => {
	if (!referrer) {
		referrer = ethers.constants.AddressZero;
	}
	try {
		const mc = getMasterChefContract();
		return mc.deposit(pid, ethers.utils.parseUnits(amount, 18), referrer);
	} catch (error) {
		console.log(error, 'Unable to deposit');
	}
};

export const withdraw = async (pid: number, amount: string): Promise<any> => {
	const mc = getMasterChefContract();
	try {
		return await mc.withdraw(pid, ethers.utils.parseUnits(amount, 18));
	} catch (e) {
		return console.log('Unable to Withdraw');
	}
};

export const getRewards = async (pid: number, user: string): Promise<any> => {
	try {
		const mc = getMasterChefContract();
		const reward = await mc.pendingFish(pid, user);
		return reward;
	} catch (error) {
		console.log('Unable to fetch user rewards', error);
	}
};

export const getStakedTokens = async (pid: number, user: string): Promise<any> => {
	const mc = getMasterChefContract();
	try {
		const [stakedTokens, ...x] = await mc.userInfo(pid, user);
		return stakedTokens;
	} catch (e) {
		return 'Not Avaliable';
	}
};

export const getPoolWeight= (totalAllocPoints: BigNumber, poolAllocPoints: BigNumber) => {
	const totalAP = ethersToBigNumber(totalAllocPoints);
	const poolAP = ethersToBigNumber(poolAllocPoints);
	const poolWeight = poolAP.div(totalAP);

	return poolWeight;
  }
 
  export const getPoolMultiplier = (poolAllocPoints : BigNumber) => {
	 const poolAp =  ethersToBigNumber(poolAllocPoints);
	 const multiplier = poolAp.toNumber() / 1000;
	 return multiplier;
  }


  export namespace MasterChef {
	  const masterChefContract = new ethers.Contract(getContractAddress(Token.MASTERCHEF),MasterChefAbi,Provider.getProviderSingleton());

	  export async function getPoolInfo (pid: number) {
		  return masterChefContract.poolInfo(pid);
	  }

	  export async function getUserInfo(pid:number, address:string){
		  return masterChefContract.userInfo(pid,address);
	  }

	  export async function getTokenPerBlock(){
		  return masterChefContract.fishPerBlock()
	  }

	  export async function poolExistance(){
		  return masterChefContract.poolExistance()
	  }
  }