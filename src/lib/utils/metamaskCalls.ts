import { getContractAddress } from './addressHelpers';
import { Token } from '$lib/types/types';
import { accounts } from '$lib/stores/MetaMaskAccount';

export const isMetaMaskInstalled = (): boolean => {
	//Have to check the ethereum binding on the window object to see if it's installed
	const { ethereum } = window;
	return Boolean(ethereum && ethereum.isMetaMask);
};

export const goInstallMetamask = (): void => {
	window.open('https://metamask.io/download');
};

export const metaMaskCon = async (): Promise<void> => {
	try {
		const user_accounts = await window.ethereum.request({
			method: 'eth_requestAccounts'
		});
		accounts.set(user_accounts);
		sessionStorage.setItem('METAMASK_ACCOUNT', user_accounts);
	} catch {
		console.log('failed');
	}
};

export const addTokenToMetamaskWallet = (): Promise<void> => {
	return window.ethereum
		.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20',
				options: {
					address: getContractAddress(Token.MUSHTOKEN),
					symbol: 'MUSH',
					decimals: 18,
					image: 'https://zyber-dev.netlify.app/assets/mushRound.png'
				}
			}
		})
		.then((success) => {
			if (success) {
				console.log('MushToken successfully added to wallet!');
			} else {
				throw new Error('Something went wrong.');
			}
		})
		.catch(console.error);
};
