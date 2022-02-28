import { ethers } from 'ethers';
import { getRpcUrl } from './rpcNodesHelper';

export const getProvider = (): ethers.providers.JsonRpcProvider => {
	return new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/');
};

const providerInstance = new ethers.providers.JsonRpcProvider(getRpcUrl());
const signerInstance = providerInstance.getSigner();

export function getProviderSingleton(): ethers.providers.JsonRpcProvider {
	return providerInstance;
}

export function getSignerSingleton(): ethers.Signer {
	return signerInstance;
}

export const getRPCSigner = (): ethers.Signer => {
	const provider = getProvider();
	return provider.getSigner();
};
