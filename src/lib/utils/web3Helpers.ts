import {ethers} from "ethers";
import { getRpcUrl } from "./rpcNodesHelper";

export const getProvider = () => {
    return new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
}

export namespace Provider {
    
    const providerInstance = new ethers.providers.JsonRpcProvider(getRpcUrl());
    const signerInstance = providerInstance.getSigner();

    export function getProviderSingleton(){
        return providerInstance;
    }

    export function getSignerSingleton(){
        return signerInstance;  
    }

}

export const getRPCSigner = () => {
    const provider = getProvider();
    return provider.getSigner();
}