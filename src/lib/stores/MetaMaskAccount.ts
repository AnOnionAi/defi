import { writable } from 'svelte/store';

export const accounts = writable(undefined);
export const chainID = writable(undefined);

export async function metamaskConnect() {
	try {
		const user_accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		accounts.set(user_accounts);

		const chain = await window.ethereum.request({ method: 'eth_chainId' });
		console.log('chain', chain);
		chainID.set(chain);

		window.ethereum.on('chainChanged', (_chainID) => {
			console.log(_chainID);
			chainID.set(_chainID);
		});

		window.ethereum.on('accountsChanged', (addresses: Array<string> | undefined) => {
			console.log('ACCOUNTS CHANGED');
			console.log(addresses, 'THE ADDRESSES');
			if (addresses.length > 0) {
				accounts.set(addresses);
			} else {
				console.log('LOGGED OUT');
				accounts.set(undefined);
			}
		});
	} catch {
		console.log("Error: Unable to log the user in Metamask")
	}
}

