import type { PoolInfo } from '$lib/ts/types';
import addresses from './addresses.json';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/ts/types';

export let pools: PoolInfo[] = [
	{
		tokenName: 'MUSH',
		tokenAddr: getContractAddress(Token.MUSHTOKEN),
		depositFee: 0,
		pid: 5
	},
	{
		tokenName: 'FISH',
		tokenAddr: getContractAddress(Token.FISHTOKEN),
		depositFee: 0,
		pid: 4
	},
	{
		tokenName: 'WMATIC',
		tokenAddr: getContractAddress(Token.WMATIC),
		depositFee: 0,
		pid: 4
	},
	{
		tokenName: 'WETH',
		tokenAddr: getContractAddress(Token.WETH),
		depositFee: 0,
		pid: 4
	},
	{
		tokenName: 'WBTC',
		tokenAddr: getContractAddress(Token.WBTC),
		depositFee: 0,
		pid: 6
	},
	{
		tokenName: 'SUSHI',
		tokenAddr: getContractAddress(Token.SUSHI),
		depositFee: 0,
		pid: 7
	},
	{
		tokenName: 'QUICK',
		tokenAddr: getContractAddress(Token.QUICK),
		depositFee: 0,
		pid: 8
	},
	{
		tokenName: 'DYFN',
		tokenAddr: getContractAddress(Token.DFYN),
		depositFee: 0,
		pid: 9
	},
	{
		tokenName: 'USDT',
		tokenAddr: getContractAddress(Token.USDT),
		depositFee: 0,
		pid: 10
	},
	{
		tokenName: 'USDC',
		tokenAddr: getContractAddress(Token.USDC),
		depositFee: 0,
		pid: 11
	},

	{
		tokenName: 'DOGE',
		tokenAddr: getContractAddress(Token.DOGE),
		depositFee: 0,
		pid: 12
	},

	{
		tokenName: 'MXNC',
		tokenAddr: getContractAddress(Token.MXNC),
		depositFee: 0,
		pid: 13
	}
];
