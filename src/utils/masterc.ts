 import type { BigNumber } from "ethers";
 import { getMasterChefContract } from "./contracts";
 import { ethers } from "ethers";


 export const deposit = async ( pid: number, amount: BigNumber, referrer?: string) => {
     if(!referrer){
         referrer = ethers.constants.AddressZero;
     }
     const mc = getMasterChefContract();
     return await mc.deposit(pid,amount,referrer);
 };


 export const withdraw = async (pid: number, amount: BigNumber): Promise<BigNumber> => {
     const mc = getMasterChefContract();
     return await mc.withdraw(pid,amount);
 };
 
 export const getRewards = async(pid: number, user: string): Promise <BigNumber> => {
     const mc = getMasterChefContract();
     return await mc.pendingmush(pid,user);
 };

 export const getStakedTokens = async(pid: number, user: string): Promise <BigNumber> => {
     const mc = getMasterChefContract();
     const [stakedTokens, ...x] =  await mc.userInfo(pid,user);
     return stakedTokens;
 };