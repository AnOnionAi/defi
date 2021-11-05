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
		tokenImagePath: "/static/mushRound.png"
	},
	{
		tokenName: 'FISH',
		tokenAddr: getContractAddress(Token.FISHTOKEN),
		depositFee: 0,
		pid: 4,
		tokenImagePath: "/static/vaultTokensIcons/fish.svg"
	},
	{
		tokenName: 'WMATIC',
		tokenAddr: getContractAddress(Token.WMATIC),
		depositFee: 0,
		pid: 4,
		tokenImagePath: "/static/vaultTokensIcons/wmatic.svg"
	},
	{
		tokenName: 'WETH',
		tokenAddr: getContractAddress(Token.WETH),
		depositFee: 0,
		pid: 4,
		tokenImagePath: "/static/vaultTokensIcons/weth.svg"
	},
	{
		tokenName: 'WBTC',
		tokenAddr: getContractAddress(Token.WBTC),
		depositFee: 0,
		pid: 6,
		tokenImagePath: "/static/vaultTokensIcons/wbtc.svg"
	},
	{
		tokenName: 'SUSHI',
		tokenAddr: getContractAddress(Token.SUSHI),
		depositFee: 0,
		pid: 7,
		tokenImagePath: "/static/sushi.png"
	},
	{
		tokenName: 'QUICK',
		tokenAddr: getContractAddress(Token.QUICK),
		depositFee: 0,
		pid: 8,
		tokenImagePath: "/static/vaultTokensIcons/quick.svg"
	},
	{
		tokenName: 'DFYN',
		tokenAddr: getContractAddress(Token.DFYN),
		depositFee: 0,
		pid: 9,
		tokenImagePath: "/static/dfyn.svg"
	},
	{
		tokenName: 'USDT',
		tokenAddr: getContractAddress(Token.USDT),
		depositFee: 0,
		pid: 10,
		tokenImagePath: "/static/vaultTokensIcons/usdt.svg"
	},
	{
		tokenName: 'USDC',
		tokenAddr: getContractAddress(Token.USDC),
		depositFee: 0,
		pid: 11,
		tokenImagePath: "/static/vaultTokensIcons/usdc.svg"
	},

	{
		tokenName: 'DOGE',
		tokenAddr: getContractAddress(Token.DOGE),
		depositFee: 0,
		pid: 12,
		tokenImagePath: "/static/doge.png"
	},

	{
		tokenName: 'MXNC',
		tokenAddr: getContractAddress(Token.MXNC),
		depositFee: 0,
		pid: 13,
		tokenImagePath: "/static/mxnc.png"
	}
];
