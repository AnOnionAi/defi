import type { BigNumber } from 'ethers';
import { polygonProvider } from './web3Utils';
import Multicall from '@indexed-finance/multicall';
import erc20Abi from '$lib/config/abi/ERC20.json';
import masterChefAbi from '$lib/config/abi/MasterChef.json';
import { Token, type CallInput } from '$lib/types/types';
import { getContractAddress } from './addressHelpers';

interface fetchPoolUserBalanceResponse {
	tokenAllowance?: BigNumber;
	userBalance?: BigNumber;
	userStakedTokens?: BigNumber;
	userEarnings?: BigNumber;
}

const fetchPoolUserBalance = async (
	pid: number,
	userAddress: string,
	tokenAddress: string
): Promise<fetchPoolUserBalanceResponse> => {
	const multicall = new Multicall(polygonProvider);
	const inputs: Array<CallInput> = [
		{
			interface: erc20Abi,
			target: tokenAddress,
			function: 'allowance',
			args: [userAddress, getContractAddress(Token.MASTERCHEF)]
		},
		{
			interface: erc20Abi,
			target: tokenAddress,
			function: 'balanceOf',
			args: [userAddress]
		},
		{
			interface: masterChefAbi,
			target: getContractAddress(Token.MASTERCHEF),
			function: 'userInfo',
			args: [pid, userAddress]
		},
		{
			interface: masterChefAbi,
			target: getContractAddress(Token.MASTERCHEF),
			function: 'pendingNative',
			args: [pid, userAddress]
		}
	];

	const [, [allowance, userBalance, userInfo, pendingNative]] =
		await multicall.multiCall(inputs);
	const { amount } = userInfo;

	return {
		tokenAllowance: allowance,
		userBalance: userBalance,
		userStakedTokens: amount,
		userEarnings: pendingNative
	};
};

export default fetchPoolUserBalance;
