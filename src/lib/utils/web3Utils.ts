import { ethers } from 'ethers';

//Exported instance of ethers JSON Rpc Provider to avoid having more than 1.
export const web3Provider = new ethers.providers.JsonRpcProvider(
	'https://polygon-rpc.com/'
);

export const getSigner = () => web3Provider.getSigner();
