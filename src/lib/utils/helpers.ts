import { BigNumber, ethers } from 'ethers';
import { accounts } from '$lib/stores/MetaMaskAccount';
export const getEthersProvider = () => {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		return provider;
	} catch (e) {
		return console.log(e, "The Web Browser doesn't have web3");
	}
};

export const getSigner = () => {
	try {
		const provider = getEthersProvider();
		return provider.getSigner();
	} catch (e) {
		console.log(e, 'Unable to get the wallet Signer');
	}
};

export const metaMaskCon = async () => {
	try {
		const user_accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		accounts.set(user_accounts);
	} catch {
		console.log('failed');
	}
};
