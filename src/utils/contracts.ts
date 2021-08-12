import MasterChefABI from "../config/abi/MasterChef.json"
import MushTokenABI from "../config/abi/MushToken.json"
import ZyberTokenABI from "../config/abi/ZyberToken.json"
import TESTLPABI  from "../config/abi/TEST-LP.json"

import {addresses} from "../config/constants/addresses"
import {ethers} from "ethers";
import  {getEthersProvider,getSigner} from "./ethersjs";

export const getMasterChefContract = () =>{
    const masterChefContract = new ethers.Contract(addresses.MasterChef.TEST,MasterChefABI,getSigner());
    return masterChefContract;

}

export const getMushTokenContract = () => {
    const mushTokenContract = new ethers.Contract(addresses.MushToken.TEST,MushTokenABI,getSigner());
    return mushTokenContract;
}

export const getZyberTokenContract = () => {
    const zyberTokenContract = new ethers.Contract(addresses.ZyberToken.TEST,MushTokenABI,getSigner());
    return zyberTokenContract;
}


export const getContractObject = (address : string ,abi : any) => {
    const contract = new ethers.Contract(address,abi,getSigner());
    return contract;
}

export const getTESTLPContract = () => {
    const LPContract = new ethers.Contract(addresses["TEST-LP"].TEST,TESTLPABI,getSigner());
    return LPContract;
}

