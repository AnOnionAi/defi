import { getContractAddress } from "./addressHelpers";


//ABI
import erc20Abi from "$lib/config/abi/ERC20.json"
import uniPairAbi from "$lib/config/abi/IUniswapV2Pair.json"
import masterChefAbi from "$lib/config/abi/MasterChef.json"
import vaultChefAbi from "$lib/config/abi/VaultChef.json"
import factoryABI from "$lib/config/abi/IUniswapV2Factory.json"
import miniChefAbi from "$lib/config/abi/miniChefv2.json"
import  { ethers } from "ethers";
import { MINICHEFV2 } from "$lib/config"
import { Provider } from "./web3Helpers";

type CustomSigner = ethers.providers.Provider | ethers.Signer

export const getErc20Contract = (address:string, signer: CustomSigner) => {
    return new ethers.Contract(address,erc20Abi,signer)
};


export const getPairContract = (address:string, signer: CustomSigner) => {
    return new ethers.Contract(address,uniPairAbi,signer)
};

export const getMasterChefContract = (address:string, signer: CustomSigner) => {
    return new ethers.Contract(address,masterChefAbi,signer)
}

export const getVaultChefContract = (address:string, signer:CustomSigner) =>{
    return new ethers.Contract(address,vaultChefAbi,signer)
}


export const getFactoryContract = (address:string,signer: CustomSigner) => {
    return new ethers.Contract(address,factoryABI,signer)
} 

export const getMiniChefContract = (address:string =MINICHEFV2,signer:CustomSigner = Provider.getProviderSingleton() ) => {
    return new ethers.Contract(address,miniChefAbi,signer)
}