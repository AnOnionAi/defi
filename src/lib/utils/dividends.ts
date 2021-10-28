import type { BigNumber } from "ethers";
import { getMushStrategyContract } from "./contracts"


export const getUserInfo = async(address: string):Promise<Array<BigNumber>> => {
    const mushStrategy = getMushStrategyContract();
    const [shares,rewardDebt]= await mushStrategy.userInfo(address);
    return [shares,rewardDebt]
}


export const harvest = async() => {
    const mushStrategy = getMushStrategyContract();
    return await mushStrategy.harvest();
}

export const getSharesTotal = async():Promise<BigNumber> => {
    const mushStrategy = getMushStrategyContract();
    const sharesTotal = await mushStrategy.sharesTotal()
    return sharesTotal;
}