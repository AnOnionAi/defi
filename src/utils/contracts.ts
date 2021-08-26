import MasterChefABI from '../config/abi/MasterChef.json';
import MushTokenABI from '../config/abi/MushToken.json';
import ZyberTokenABI from '../config/abi/ZyberToken.json';
import TESTLPABI from '../config/abi/TEST-LP.json';
import ERC20ABI from '../config/abi/ERC20.json'
import { farms } from '../config/constants/farms';
import { addresses } from '../config/constants/addresses';
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

export const getLPTokensContracts = () => {
	let arrayContracts = [];
	farms.forEach((farm) => {
		arrayContracts.push(new ethers.Contract(farm.lpTokenAddress, farm.abiToken, getSigner()));
	});
	return arrayContracts;
};

export const getERC20Contract = (address : string) => {
	const ercToken = new ethers.Contract(address,ERC20ABI,getSigner());
	return ercToken;
}

export const getMushAllowance = async (userAddr: string) => {
	const mushContract = new ethers.Contract(addresses.MushToken.TEST,ERC20ABI,getSigner());
	return await mushContract.allowance(userAddr,"0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506");
}

export const getTokenAllowance = async (tknAddr: string, spenderAddr: string,userAddr: string) => {
	const tokenContract = new ethers.Contract(tknAddr,ERC20ABI,getSigner());
	return await tokenContract.allowance(userAddr,spenderAddr);
}

export const approveToken = async(tknAddr: string, spenderAddr: string , userAddr: string) =>{
	const tokenContract = new ethers.Contract(tknAddr,ERC20ABI,getSigner());
	return await tokenContract.approve(spenderAddr,userAddr);
}

export const isApproved = (allowance: BigNumber) => {
	return allowance._hex !== ethers.constants.Zero._hex
}

// export const addLiqudity()


