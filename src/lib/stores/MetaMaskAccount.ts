import { POLYGON_CHAIN_ID } from '$lib/config';
import { writable } from 'svelte/store';

export const accounts = writable(undefined);
export const chainID = writable(undefined);

export async function metamaskConnect(): Promise<void> {
	try {
		const user_accounts = await window.ethereum.request({
			method: 'eth_requestAccounts'
		});
		accounts.set(user_accounts);

		const userCurrentBlockchain = await window.ethereum.request({
			method: 'eth_chainId'
		});
		chainID.set(userCurrentBlockchain);

		const chain = await window.ethereum.request({ method: 'eth_chainId' });
		chainID.set(chain);
	} catch {
		console.log('The user rejected the connection');
	}
}

export async function retrieveUserAddress(): Promise<string | null> {
	if (!window.ethereum) return;
	const address = window.ethereum.selectedAddress;
	const currentBlockchain = await window.ethereum.request({
		method: 'eth_chainId'
	});
	chainID.set(currentBlockchain);
	return address;
}

/*This executes only when the application mounts. */
export async function logUser(): Promise<void> {
	//First check if the user is already connected to the app via metamask
	const userAddress = await retrieveUserAddress();
	if (userAddress) {
		accounts.set([userAddress]);
	}
}

export async function metamaskListeners(): Promise<void> {
	try {
		window.ethereum.on('chainChanged', (_chainID) => {
			chainID.set(_chainID);
		});

		window.ethereum.on(
			'accountsChanged',
			(addresses: Array<string> | undefined) => {
				if (addresses.length > 0) {
					accounts.set(addresses);
				} else {
					accounts.set(undefined);
				}
			}
		);
	} catch {
		console.log('Error: Error when changing account or network in Metamask');
	}
}

export const requestChainChange = async (): Promise<void> => {
	return window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: POLYGON_CHAIN_ID }]
	});
};

export const requestChainAdd = async (): Promise<void> => {
	return window.ethereum.request({
		method: 'wallet_addEthereumChain',
		params: [
			{
				chainId: POLYGON_CHAIN_ID,
				chainName: 'Matic Mainnet',
				rpcUrls: ['https://polygon-rpc.com/']
			}
		]
	});
};
