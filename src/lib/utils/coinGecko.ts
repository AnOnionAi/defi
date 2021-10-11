import axios from 'axios';

type ContractAddress = string;

export const getTokenPriceUSD = (addr: ContractAddress): Promise<any> => {
	return new Promise((resolve, reject) => {
		axios
			.get(
				`https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${addr}&vs_currencies=usd`
			)
			.then((response) => resolve(response.data))
			.catch((error) => reject(error));
	});
};
