import { POLYGON_CHAIN_ID } from '$lib/config';
import { writable } from 'svelte/store';

export const accounts = writable(undefined);
export const chainID = writable(undefined);

export async function metamaskConnect() {
	try {
		const user_accounts = await window.ethereum.request({
			method: 'eth_requestAccounts'
		});
		accounts.set(user_accounts);
		sessionStorage.setItem('METAMASK_ACCOUNT', user_accounts);

		const chain = await window.ethereum.request({ method: 'eth_chainId' });
		console.log('chain', chain);
		chainID.set(chain);
	} catch {
		console.log('Error: Unable to log the user in Metamask');
	}
}

export async function metamaskListeners() {
	try {
		window.ethereum.on('chainChanged', (_chainID) => {
			console.log(_chainID);
			chainID.set(_chainID);
		});

		window.ethereum.on(
			'accountsChanged',
			(addresses: Array<string> | undefined) => {
				console.log('ACCOUNTS CHANGED');
				console.log(addresses, 'THE ADDRESSES');
				if (addresses.length > 0) {
					accounts.set(addresses);
					sessionStorage.setItem('METAMASK_ACCOUNT', JSON.stringify(addresses));
				} else {
					console.log('LOGGED OUT');
					accounts.set(undefined);
					sessionStorage.removeItem('METAMASK_ACCOUNT');
				}
			}
		);
	} catch {
		console.log('Error: Error when changing account or network in Metamask');
	}
}

export const requestChainChange = async () => {
	return window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: POLYGON_CHAIN_ID }] // chainId must be in hexadecimal numbers
	});
};
