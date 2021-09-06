import { BigNumber, ethers } from 'ethers';
import { accounts } from '$lib/stores/MetaMaskAccount';
export const getEthersProvider = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	return provider;
};

export const getSigner = () => {
	const provider = getEthersProvider();
	return provider.getSigner();
};

export const metaMaskCon = async () => {
	try {
		const user_accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		accounts.set(user_accounts);
	} catch {
		console.log('failed');
	}
};