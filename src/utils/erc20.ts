import ERC20ABI from '../config/abi/ERC20.json';
import { BigNumber, ethers } from 'ethers';
import { getSigner } from './helpers';

export const getERC20Contract = (address : string) => {
	const ercToken = new ethers.Contract(address,ERC20ABI,getSigner());
	return ercToken;
}


export const getTokenAllowance = async (tknAddr: string, spenderAddr: string,userAddr: string): Promise<BigNumber> => {
    try {
        const tokenContract = getERC20Contract(tknAddr);
	    const allowance = await tokenContract.allowance(userAddr,spenderAddr);
        return allowance;
    } catch (e) {
        return ethers.constants.Zero;
    }
	
}

export const approveToken = async(tknAddr: string, spenderAddr: string ) => {
	try {
        const tokenContract = getERC20Contract(tknAddr)
        return await tokenContract.approve(spenderAddr, "100000000000");    
    } catch (e) {
        return '0';
    }
}

export const getTokenBalance = async(tknAddr: string, userAddr) => {
    const tokenContract = getERC20Contract(tknAddr);
    try {
        const balance = await tokenContract.balanceOf(userAddr);
        return balance;
    }catch(e){
        return ethers.constants.Zero
    }
}


export const isNotZero = (allowance: BigNumber) => {
	return allowance._hex !== ethers.constants.Zero._hex
}
