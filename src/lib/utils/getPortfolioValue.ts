import { sushiVaults } from '$lib/config/constants/vaults';
import { Token, type VaultInfo } from '$lib/types/types';
import { ethers } from 'ethers';
import { getContractAddress, getMasterChefAddress } from './addressHelpers';
import { getTokenBalance } from './erc20';
import { getVaultAPYandAPR } from './getVaultAPY';
import { getPriceOfMushPair } from './lpTokenUtils';

interface TokenBalancesResponse {
	address: string;
	updated_at: string;
	next_update_at: string;
	quote_currency: string;
	chain_id: number;
	items: Array<ERC20MetaData>;
}

interface ERC20MetaData {
	contract_decimals: number;
	contract_name: string;
	contract_address: string;
	supports_erc20: Array<string>;
	logo_url: string;
	last_transferred_at: string;
	contract_ticker_symbol: string;
	type: string;
	balance: string;
	balance_24h: string;
	quote_rate: number;
	quote_rate_24h: number;
	quote: number;
	quote_24h: number;
	nft_data: string;
}

//hardpatched, refactor this in a future please.
export const getPortfolioValue = async (address: string): Promise<number> => {
	const APIURL = `https://api.covalenthq.com/v1/137/address/${address}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=${
		import.meta.env.VITE_COVALENT_API_KEY
	}`;
	try {
		const response = await fetch(APIURL);
		const { data } = await response.json();
		const dataReponse: TokenBalancesResponse = data;
		const { items } = dataReponse;
		const whiteList = [
			'USDC',
			'WMATIC',
			'CRYSTL',
			'WETH',
			'WBTC',
			'DAI',
			'LINK',
			'POLYDOGE',
			'MATIC'
		];

		const filteredTokens = items.filter((asset) =>
			whiteList.includes(asset.contract_ticker_symbol.toUpperCase())
		);

		let usdValue = 0;

		for (const token of filteredTokens) {
			usdValue += token.quote;
		}
		return usdValue;
	} catch {
		return 0;
	}
};

export const getPoolsTVL = async (): Promise<number> => {
	return getPortfolioValue(getMasterChefAddress());
};

export const getFarmsTVL = async (): Promise<number> => {
	const usdcMushPairAddress = getContractAddress(Token.SUSHILP);
	const pairPricePromise = getPriceOfMushPair(usdcMushPairAddress);
	const stakedAmountPromise = getTokenBalance(
		usdcMushPairAddress,
		getContractAddress(Token.MASTERCHEF)
	);
	const [pairPrice, stakedAmount] = await Promise.all([
		pairPricePromise,
		stakedAmountPromise
	]);
	if (stakedAmount.isZero()) return 0;
	const parsedStakedAmount = parseFloat(ethers.utils.formatEther(stakedAmount));
	return pairPrice * parsedStakedAmount;
};

export const getVaultsTvl = async (): Promise<number> => {
	try {
		const sushiVaultsTVL = await Promise.all(
			sushiVaults.map((vault) => getVaultAPYandAPR(vault))
		);
		let totalLockedInVaults = 0;
		for (const { tvl } of sushiVaultsTVL) {
			totalLockedInVaults += tvl;
		}
		return totalLockedInVaults;
	} catch (e) {
		return 0;
	}
};
