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
          image: "https://cdn-icons.flaticon.com/png/512/2217/premium/2217505.png?token=exp=1634245623~hmac=c1fc2027775e39b817b23911d076828d",
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
