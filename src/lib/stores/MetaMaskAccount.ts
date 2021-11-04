import { writable } from 'svelte/store';

export const accounts = writable(undefined);



async function metamaskConnect(){
    try {
		const user_accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		accounts.set(user_accounts);
	} catch {
		console.log('failed');
	}
}

metamaskConnect();