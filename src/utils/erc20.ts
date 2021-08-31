import ERC20ABI from '../config/abi/ERC20.json';
import { BigNumber, ethers } from 'ethers';
import { getSigner } from './helpers';

export const getERC20Contract = (address : string) => {
	const ercToken = new ethers.Contract(address,ERC20ABI,getSigner());
	return ercToken;
}


export const getTokenAllowance = async (tknAddr: string, spenderAddr: string,userAddr: string) => {
    try {
        const tokenContract = getERC20Contract(tknAddr);
	    return await tokenContract.allowance(userAddr,spenderAddr);
    } catch (e) {
        return '0';
    }
	
}

export const approveToken = async(tknAddr: string, spenderAddr: string , userAddr: string) =>{
	try {
        const tokenContract = getERC20Contract(tknAddr)
        return await tokenContract.approve(spenderAddr,userAddr);    
    } catch (e) {
        return '0';
    }
}

export const getTokenBalance = async(tknAddr: string, userAddr) => {
    const tokenContract = getERC20Contract(tknAddr);
    try {
        return tokenContract.balanceOf(userAddr);
    }catch(e){
        return '0'
    }
}


export const isApproved = (allowance: BigNumber) => {
	return allowance._hex !== ethers.constants.Zero._hex
}
