import type { BigNumber } from 'ethers';
import { getMasterChefContract } from './contracts';
import { ethers } from 'ethers';
import { ethersToBigNumber } from './bigNumber';
import { Provider } from './web3Helpers';
import MasterChefAbi from '$lib/config/abi/MasterChef.json';
import { getContractAddress } from './addressHelpers';
import { Token } from '$lib/ts/types';
import { getSigner } from './helpers';


export namespace MasterChef {
	
	const masterChefContract = new ethers.Contract(
		getContractAddress(Token.MASTERCHEF),
		MasterChefAbi,
		Provider.getProviderSingleton()
	);

	const masterChefContractSigner = new ethers.Contract(
		getContractAddress(Token.MASTERCHEF),
		MasterChefAbi,
		getSigner()
	);

	export const getDevAddress = async() => masterChefContract.devAddress();

	export const getFeeAddress = async() => masterChefContract.feeAddress();

	export const getMultiplier = async(from:number,to:number) => masterChefContract.getMultiplier(from,to);
	
	export const getMarketingAddress = async() => masterChefContract.marketingAddress();

	export const getMushAddress = async() => masterChefContract.mush();

	export const getMushMaxSupply = async() => masterChefContract.mushMaxSupply();
	
	export const getMushPerBlock = async() => masterChefContract.mushPerBlock();

	export const owner  = async () => masterChefContract.owner();

	export const getPendingMush = async() => masterChefContract.pendingMush();

	export const poolExistance = async() => masterChefContract.poolExistance();

	export const getPoolInfo = async(pid:number) => masterChefContract.poolInfo(pid);

	export const getPoolLength = async () => masterChefContract.poolLength();

	export const getReferralComissionRate = async() => masterChefContract.referralComissionRate();

	export const getStartBlock = async() => masterChefContract.startBlock();

	export const getTotalAllocPoints = async() => masterChefContract.totalAllocPoint();

	export const getUserInfo = async(pid: number, address: string) => masterChefContract.userInfo(pid, address);

	export const getTokenPerBlock = async() => masterChefContract.mushPerBlock();

	export const getVaultAddress = async() =>masterChefContract.vaultAddress();

	export const deposit = async(pid:number, amount:any, referrer = ethers.constants.AddressZero )=> masterChefContractSigner.deposit(pid,amount,referrer);

	export const withdraw = async(pid:number, amount:any ) => masterChefContractSigner.withdraw(pid,amount)

	export const harvestRewards = async(pid:number) => masterChefContractSigner.deposit(pid,ethers.constants.Zero,ethers.constants.AddressZero);


}

export const getPoolWeight = (totalAllocPoints: BigNumber, poolAllocPoints: BigNumber) => {
	const totalAP = ethersToBigNumber(totalAllocPoints);
	const poolAP = ethersToBigNumber(poolAllocPoints);
	const poolWeight = poolAP.div(totalAP);

	return poolWeight;
};

export const getPoolMultiplier = (poolAllocPoints: BigNumber) => {
	const poolAp = ethersToBigNumber(poolAllocPoints);
	const multiplier = poolAp.toNumber() / 1000;
	return multiplier;
};
