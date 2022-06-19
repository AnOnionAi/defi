import type { BigNumber } from 'ethers';
import { polygonProvider } from './web3Utils';
import Multicall from '@indexed-finance/multicall';
import erc20Abi from '$lib/config/abi/ERC20.json';
import vaultChefAbi from '$lib/config/abi/VaultChef.json';
import { Token, type CallInput } from '$lib/types/types';
import { getContractAddress } from './addressHelpers';
import { getPoolTokenPriceUSD } from './coinGecko';

interface fetchVaultResponse {
	blockNumber?: number;
	tokenAllowance?: BigNumber;
	userBalance?: BigNumber;
	userStakedTokens?: BigNumber;
}

export const fetchVault = async (
	vaultID: number,
	userAddress: string,
	pairTokenAddress: string
): Promise<fetchVaultResponse> => {
	const multicall = new Multicall(polygonProvider);

	const inputs: Array<CallInput> = [
		{
			interface: erc20Abi,
			target: pairTokenAddress,
			function: 'allowance',
			args: [userAddress, getContractAddress(Token.VAULTCHEF)]
		},
		{
			interface: erc20Abi,
			target: pairTokenAddress,
			function: 'balanceOf',
			args: [userAddress]
		},
		{
			interface: vaultChefAbi,
			target: getContractAddress(Token.VAULTCHEF),
			function: 'stakedWantTokens',
			args: [vaultID, userAddress]
		}
	];

	const [responseBlockNumber, [tokenAllowance, userBalance, userStakedTokens]] =
		await multicall.multiCall(inputs);

	return {
		blockNumber: responseBlockNumber,
		tokenAllowance: tokenAllowance,
		userBalance: userBalance,
		userStakedTokens: userStakedTokens
	};
};

interface pairPriceResponse {
	token0Price: number;
	token1Price: number;
}

export const fetchVaultPairTokensPrice = async (
	token0Address: string,
	token1Addess: string
): Promise<pairPriceResponse> => {
	const [token0Price, token1Price] = await Promise.all([
		getPoolTokenPriceUSD(token0Address),
		getPoolTokenPriceUSD(token1Addess)
	]);

	return {
		token0Price: token0Price,
		token1Price: token1Price
	};
};
