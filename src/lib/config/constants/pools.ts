import type { PoolInfo } from '$lib/ts/types';
import addresses from './addresses.json';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/ts/types';

export let pools: PoolInfo[] = [
	/* 	{
		tokenName: 'MUSH',
		tokenAddr: getContractAddress(Token.MUSHTOKEN),
		pid: 5,
		tokenImagePath: '/mushRound.png'
	},
	{
		tokenName: 'FISH',
		tokenAddr: getContractAddress(Token.FISHTOKEN),
		pid: 4,
		tokenImagePath: '/vaultTokensIcons/fish.svg'
	},
	{
		tokenName: 'WMATIC',
		tokenAddr: getContractAddress(Token.WMATIC),
		pid: 4,
		tokenImagePath: '/vaultTokensIcons/wmatic.svg'
	},
	{
		tokenName: 'WETH',
		tokenAddr: getContractAddress(Token.WETH),
		pid: 4,
		tokenImagePath: '/vaultTokensIcons/weth.svg'
	},
	{
		tokenName: 'WBTC',
		tokenAddr: getContractAddress(Token.WBTC),
		pid: 6,
		tokenImagePath: '/vaultTokensIcons/wbtc.svg'
	},
	{
		tokenName: 'SUSHI',
		tokenAddr: getContractAddress(Token.SUSHI),
		pid: 7,
		tokenImagePath: '/sushi.png'
	},
	{
		tokenName: 'QUICK',
		tokenAddr: getContractAddress(Token.QUICK),
		pid: 8,
		tokenImagePath: '/vaultTokensIcons/quick.svg'
	},
	{
		tokenName: 'DFYN',
		tokenAddr: getContractAddress(Token.DFYN),
		pid: 9,
		tokenImagePath: '/dfyn.svg'
	},
	{
		tokenName: 'USDT',
		tokenAddr: getContractAddress(Token.USDT),
		pid: 10,
		tokenImagePath: '/vaultTokensIcons/usdt.svg'
	}, */
	{
		tokenName: 'USDC',
		tokenAddr: getContractAddress(Token.USDC),
		pid: 3,
		tokenImagePath: '/vaultTokensIcons/usdc.svg'
	}
	/* 
	{
		tokenName: 'DOGE',
		tokenAddr: getContractAddress(Token.DOGE),
		pid: 12,
		tokenImagePath: '/doge.png'
	},

	{
		tokenName: 'MXNC',
		tokenAddr: getContractAddress(Token.MXNC),
		pid: 13,
		tokenImagePath: '/mxnc.png'
	} */
];
