import { getContractAddress } from "./addressHelpers";
import { Token } from "$lib/ts/types";
import mushIcon from "/static/mushRound.png"

export const metaMaskCon = async () => {
	try {
		const user_accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		accounts.set(user_accounts);
	} catch {
		console.log('failed');
	}
};


export const addTokenToMetamaskWallet = () => {
    return ethereum
    .request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: getContractAddress(Token.MUSHTOKEN),
          symbol: 'MUSH',
          decimals: 18,
          image: "https://cdn-icons.flaticon.com/png/512/3467/premium/3467614.png?token=exp=1633971027~hmac=34587e24d3b34dafcbc87bdd8f531a9e",
        },
      },
    })
    .then((success) => {
      if (success) {
        console.log('MushToken successfully added to wallet!')
      } else {
        throw new Error('Something went wrong.')
      }
    })
    .catch(console.error)
}
