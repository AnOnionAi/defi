import { ethers } from 'ethers';

export const polygonProvider = new ethers.providers.JsonRpcProvider(
	'https://polygon-rpc.com/'
);

export const getSigner = () =>
	new ethers.providers.Web3Provider(window.ethereum).getSigner();
