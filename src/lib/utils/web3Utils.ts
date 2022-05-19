import { accounts } from '$lib/stores/MetaMaskAccount';
import { ethers } from 'ethers';

let userAddress;

accounts.subscribe((arrayAccounts) => {
	userAddress = arrayAccounts?.[0];
});

export const polygonProvider = new ethers.providers.JsonRpcProvider(
	'https://polygon-rpc.com/'
);

export const providerRinkeby = new ethers.providers.JsonRpcProvider(
	'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
);

export const getSigner = () =>
	new ethers.providers.Web3Provider(window.ethereum).getSigner();
