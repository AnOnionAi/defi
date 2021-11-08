import type { PoolInfo } from '$lib/ts/types';
import addresses from './addresses.json';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/ts/types';

export let pools: PoolInfo[] = [
	{
		tokenName: 'MUSH',
		tokenAddr: getContractAddress(Token.MUSHTOKEN),
		depositFee: 0,
		pid: 5,
		tokenImagePath: "/mushRound.png"
	},
	{
		tokenName: 'FISH',
		tokenAddr: getContractAddress(Token.FISHTOKEN),
		depositFee: 0,
		pid: 4,
		tokenImagePath: "/vaultTokensIcons/fish.svg"
	},
	{
		tokenName: 'WMATIC',
		tokenAddr: getContractAddress(Token.WMATIC),
		depositFee: 0,
		pid: 4,
		tokenImagePath: "/vaultTokensIcons/wmatic.svg"
	},
	{
		tokenName: 'WETH',
		tokenAddr: getContractAddress(Token.WETH),
		depositFee: 0,
		pid: 4,
		tokenImagePath: "/vaultTokensIcons/weth.svg"
	},
	{
		tokenName: 'WBTC',
		tokenAddr: getContractAddress(Token.WBTC),
		depositFee: 0,
		pid: 6,
		tokenImagePath: "/vaultTokensIcons/wbtc.svg"
	},
	{
		tokenName: 'SUSHI',
		tokenAddr: getContractAddress(Token.SUSHI),
		depositFee: 0,
		pid: 7,
		tokenImagePath: "/sushi.png"
	},
	{
		tokenName: 'QUICK',
		tokenAddr: getContractAddress(Token.QUICK),
		depositFee: 0,
		pid: 8,
		tokenImagePath: "/vaultTokensIcons/quick.svg"
	},
	{
		tokenName: 'DFYN',
		tokenAddr: getContractAddress(Token.DFYN),
		depositFee: 0,
		pid: 9,
		tokenImagePath: "/dfyn.svg"
	},
	{
		tokenName: 'USDT',
		tokenAddr: getContractAddress(Token.USDT),
		depositFee: 0,
		pid: 10,
		tokenImagePath: "/vaultTokensIcons/usdt.svg"
	},
	{
		tokenName: 'USDC',
		tokenAddr: getContractAddress(Token.USDC),
		depositFee: 0,
		pid: 11,
		tokenImagePath: "/vaultTokensIcons/usdc.svg"
	},

	{
		tokenName: 'DOGE',
		tokenAddr: getContractAddress(Token.DOGE),
		depositFee: 0,
		pid: 12,
		tokenImagePath: "/doge.png"
	},

	{
		tokenName: 'MXNC',
		tokenAddr: getContractAddress(Token.MXNC),
		depositFee: 0,
		pid: 13,
		tokenImagePath: "/mxnc.png"
	}
];
