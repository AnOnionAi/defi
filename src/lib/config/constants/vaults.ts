import type { QuickSwapVault, VaultInfo } from '$lib/ts/types';
import addresses from './addresses.json';
import platforms from './platforms.json';
import { TokenQuotes } from '$lib/ts/types';
import env from '$lib/env';
import { Token } from '$lib/ts/types';
import { getContractAddress } from '$lib/utils/addressHelpers';
export const quickVaults: QuickSwapVault[] = [
	{
		pid: 0,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'WMATIC',
			token1Name: 'USDC',
			token0quote: TokenQuotes.WRAPPED_MATIC,
			token1quote: TokenQuotes.USDC,
			token0Contract: getContractAddress(Token.WMATIC),
			token1Contract: getContractAddress(Token.USDC),
			pairContract: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
			pairURL: 'https://polygonscan.com/address/0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827#code'
		},
		strategyContractAddress: '0x5a80f6fc727f7D0c060aeaAAb1640bb92FCfb30B',
		dualRewarding:false
	},
	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'WETH',
			token1Name: 'WMATIC',
			token0quote: TokenQuotes.WRAPPED_MATIC,
			token1quote: TokenQuotes.WRAPPED_ETHER,
			token0Contract: getContractAddress(Token.WMATIC),
			token1Contract: getContractAddress(Token.WETH),
			pairContract: '0xadbf1854e5883eb8aa7baf50705338739e558e5b',
			pairURL: 'https://polygonscan.com/address/0xadbf1854e5883eb8aa7baf50705338739e558e5b'
		},
		strategyContractAddress: 'LF',
		dualRewarding:false
	},
	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'WETH',
			token1Name: 'USDT',
			token0quote: TokenQuotes.WRAPPED_ETHER,
			token1quote: TokenQuotes.USDT,
			token0Contract: getContractAddress(Token.WETH),
			token1Contract: getContractAddress(Token.USDT),
			pairContract: '0xf6422b997c7f54d1c6a6e103bcb1499eea0a7046',
			pairURL: 'https://polygonscan.com/address/0xf6422b997c7f54d1c6a6e103bcb1499eea0a7046'
		},
		strategyContractAddress: 'LF',
		dualRewarding:false
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'WMATIC',
			token1Name: 'SOL',
			token0quote: TokenQuotes.WRAPPED_ETHER,
			token1quote: TokenQuotes.SOL,
			token0Contract: getContractAddress(Token.WMATIC),
			token1Contract: getContractAddress(Token.SOL),
			pairContract: '0x898386dd8756779a4ba4f1462891b92dd76b78ef',
			pairURL: 'https://polygonscan.com/address/0x898386dd8756779a4ba4f1462891b92dd76b78ef'
		},
		strategyContractAddress: 'LF',
		dualRewarding:false
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'DAI',
			token1Name: 'USDC',
			token0quote: TokenQuotes.DAI,
			token1quote: TokenQuotes.USDC,
			token0Contract: getContractAddress(Token.DAI),
			token1Contract: getContractAddress(Token.USDC),
			pairContract: '0xf04adbf75cdfc5ed26eea4bbbb991db002036bdd',
			pairURL: 'https://polygonscan.com/address/0xf04adbf75cdfc5ed26eea4bbbb991db002036bdd'
		},
		strategyContractAddress: 'LF',
		dualRewarding:false
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'WMATIC',
			token1Name: 'USDT',
			token0quote: TokenQuotes.WRAPPED_MATIC,
			token1quote: TokenQuotes.USDT,
			token0Contract: getContractAddress(Token.WMATIC),
			token1Contract: getContractAddress(Token.USDT),
			pairContract: '0x604229c960e5cacf2aaeac8be68ac07ba9df81c3',
			pairURL: 'https://polygonscan.com/address/0x604229c960e5cacf2aaeac8be68ac07ba9df81c3'
		},
		strategyContractAddress: 'LF',
		dualRewarding:false
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'WMATIC',
			token1Name: 'QUICK',
			token0quote: TokenQuotes.WRAPPED_MATIC,
			token1quote: TokenQuotes.QUICK,
			token0Contract: getContractAddress(Token.WMATIC),
			token1Contract: getContractAddress(Token.QUICK),
			pairContract: '0x019ba0325f1988213d448b3472fa1cf8d07618d7',
			pairURL: 'https://polygonscan.com/address/0x604229c960e5cacf2aaeac8be68ac07ba9df81c3'
		},
		strategyContractAddress: 'LF',
		dualRewarding:false
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'LINK',
			token1Name: 'WETH',
			token0quote: TokenQuotes.WRAPPED_ETHER,
			token1quote: TokenQuotes.LINK,
			token0Contract: getContractAddress(Token.LINK),
			token1Contract: getContractAddress(Token.WETH),
			pairContract: '0x5ca6ca6c3709e1e6cfe74a50cf6b2b6ba2dadd67',
			pairURL: 'https://polygonscan.com/address/0x5ca6ca6c3709e1e6cfe74a50cf6b2b6ba2dadd67'
		},
		strategyContractAddress: 'LF',
		dualRewarding:false
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'QUICK',
			token1Name: 'CNTR',
			token0quote: TokenQuotes.QUICK,
			token1quote: TokenQuotes.CNTR,
			token0Contract: getContractAddress(Token.QUICK),
			token1Contract: getContractAddress(Token.CNTR),
			pairContract: '0xb56843b5550e3f78613ca5abf6bd6ae6f84cd11e',
			pairURL: 'https://polygonscan.com/address/0xb56843b5550e3f78613ca5abf6bd6ae6f84cd11e'
		},
		strategyContractAddress: 'LF',
		dualRewarding:false
	},
	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'DAI',
			token1Name: 'USDT',
			token0quote: TokenQuotes.DAI,
			token1quote: TokenQuotes.USDT,
			token0Contract: getContractAddress(Token.DAI),
			token1Contract: getContractAddress(Token.USDT),
			pairContract: '0x59153f27eefe07e5ece4f9304ebba1da6f53ca88',
			pairURL: 'https://polygonscan.com/address/0x59153f27eefe07e5ece4f9304ebba1da6f53ca88'
		},
		strategyContractAddress: 'LF',
		dualRewarding:false
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'USDC',
			token1Name: 'QUICK',
			token0quote: TokenQuotes.USDC,
			token1quote: TokenQuotes.QUICK,
			token0Contract: getContractAddress(Token.USDC),
			token1Contract: getContractAddress(Token.QUICK),
			pairContract: '0x1f1e4c845183ef6d50e9609f16f6f9cae43bc9cb',
			pairURL: 'https://polygonscan.com/address/0x1f1e4c845183ef6d50e9609f16f6f9cae43bc9cb'
		},
		strategyContractAddress: 'LF',
		dualRewarding:false
	}
];

export const sushiVaults: VaultInfo[] = [
	{
		pid: -1,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.SUSHISWAP,
		pair: {
			token0Name: 'WETH',
			token1Name: 'USDC',
			token0quote: TokenQuotes.WRAPPED_ETHER,
			token1quote: TokenQuotes.USDC,
			token0Contract: getContractAddress(Token.WETH),
			token1Contract: getContractAddress(Token.USDC),
			pairContract: '0x34965ba0ac2451a34a0471f04cca3f990b8dea27',
			pairURL:
				'https://analytics-polygon.sushi.com/pairs/0x34965ba0ac2451a34a0471f04cca3f990b8dea27'
		},
		strategyContractAddress: ''
	},
	{
		pid: -1,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.SUSHISWAP,
		pair: {
			token0Name: 'WBTC',
			token1Name: 'WETH',
			token0quote: TokenQuotes.WRAPPED_BITCOIN,
			token1quote: TokenQuotes.WRAPPED_ETHER,
			token0Contract: getContractAddress(Token.WBTC),
			token1Contract: getContractAddress(Token.WETH),
			pairContract: '0xe62ec2e799305e0d367b0cc3ee2cda135bf89816',
			pairURL:
				'https://analytics-polygon.sushi.com/pairs/0xe62ec2e799305e0d367b0cc3ee2cda135bf89816'
		},
		strategyContractAddress: ''
	},

	{
		pid: -1,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.SUSHISWAP,
		pair: {
			token0Name: 'WETH',
			token1Name: 'WMATIC',
			token0quote: TokenQuotes.WRAPPED_ETHER,
			token1quote: TokenQuotes.WRAPPED_MATIC,
			token0Contract: getContractAddress(Token.WETH),
			token1Contract: getContractAddress(Token.WMATIC),
			pairContract: '0xc4e595acdd7d12fec385e5da5d43160e8a0bac0e',
			pairURL:
				'https://analytics-polygon.sushi.com/pairs/0xc4e595acDD7d12feC385E5dA5D43160e8A0bAC0E'
		},
		strategyContractAddress: ''
	},

	{
		pid: -1,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.SUSHISWAP,
		pair: {
			token0Name: 'WETH',
			token1Name: 'AAVE',
			token0quote: TokenQuotes.WRAPPED_ETHER,
			token1quote: TokenQuotes.AAVE,
			token0Contract: getContractAddress(Token.WETH),
			token1Contract: getContractAddress(Token.AAVE),
			pairContract: '0xc4e595acdd7d12fec385e5da5d43160e8a0bac0e',
			pairURL:
				'https://analytics-polygon.sushi.com/pairs/0x2813d43463c374a680f235c428fb1d7f08de0b69'
		},
		strategyContractAddress: ''
	},
	{
		pid: -1,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.SUSHISWAP,
		pair: {
			token0Name: 'WBTC',
			token1Name: 'ibBTC',
			token0quote: TokenQuotes.WRAPPED_BITCOIN,
			token1quote: TokenQuotes.WRAPPED_MATIC,
			token0Contract: getContractAddress(Token.WBTC),
			token1Contract: getContractAddress(Token.IBBTC),
			pairContract: '0x8f8e95ff4b4c5e354ccb005c6b0278492d7b5907',
			pairURL:
				'https://analytics-polygon.sushi.com/pairs/0x8f8e95ff4b4c5e354ccb005c6b0278492d7b5907'
		},
		strategyContractAddress: ''
	},
	{
		pid: -1,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.SUSHISWAP,
		pair: {
			token0Name: 'LINK',
			token1Name: 'WETH',
			token0quote: TokenQuotes.LINK,
			token1quote: TokenQuotes.WRAPPED_ETHER,
			token0Contract: getContractAddress(Token.LINK),
			token1Contract: getContractAddress(Token.WETH),
			pairContract: '0x74d23f21f780ca26b47db16b0504f2e3832b9321',
			pairURL:
				'https://analytics-polygon.sushi.com/pairs/0x74d23f21f780ca26b47db16b0504f2e3832b9321'
		},
		strategyContractAddress: ''
	},
	{
		pid: -1,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.SUSHISWAP,
		pair: {
			token0Name: 'GRT',
			token1Name: 'WETH',
			token0quote: TokenQuotes.GRT,
			token1quote: TokenQuotes.WRAPPED_ETHER,
			token0Contract: getContractAddress(Token.GRT),
			token1Contract: getContractAddress(Token.WETH),
			pairContract: '0x1ceda73c034218255f50ef8a2c282e6b4c301d60',
			pairURL:
				'https://analytics-polygon.sushi.com/pairs/0x1ceda73c034218255f50ef8a2c282e6b4c301d60'
		},
		strategyContractAddress: ''
	},
	{
		pid: -1,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.SUSHISWAP,
		pair: {
			token0Name: 'WETH',
			token1Name: 'DAI',
			token0quote: TokenQuotes.WRAPPED_ETHER,
			token1quote: TokenQuotes.DAI,
			token0Contract: getContractAddress(Token.WETH),
			token1Contract: getContractAddress(Token.DAI),
			pairContract: '0x6ff62bfb8c12109e8000935a6de54dad83a4f39f',
			pairURL:
				'https://analytics-polygon.sushi.com/pairs/0x6ff62bfb8c12109e8000935a6de54dad83a4f39f'
		},
		strategyContractAddress: ''
	},
	{
		pid: -1,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.SUSHISWAP,
		pair: {
			token0Name: 'WETH',
			token1Name: 'AXS',
			token0quote: TokenQuotes.WRAPPED_ETHER,
			token1quote: TokenQuotes.AXS,
			token0Contract: getContractAddress(Token.WETH),
			token1Contract: getContractAddress(Token.AXS),
			pairContract: '0x7ba331a8b360f4c31e6014abdd6852f92fb21557',
			pairURL:
				'https://analytics-polygon.sushi.com/pairs/0x7ba331a8b360f4c31e6014abdd6852f92fb21557'
		},
		strategyContractAddress: ''
	},

	{
		pid: -1,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.SUSHISWAP,
		pair: {
			token0Name: 'CRV',
			token1Name: 'WETH',
			token0quote: TokenQuotes.CURVE,
			token1quote: TokenQuotes.WRAPPED_ETHER,
			token0Contract: getContractAddress(Token.CRV),
			token1Contract: getContractAddress(Token.WETH),
			pairContract: '0x396e655c309676caf0acf4607a868e0cded876db',
			pairURL:
				'https://analytics-polygon.sushi.com/pairs/0x396e655c309676caf0acf4607a868e0cded876db'
		},
		strategyContractAddress: ''
	},

	{
		pid: -1,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.SUSHISWAP,
		pair: {
			token0Name: 'WETH',
			token1Name: 'AVAX',
			token0quote: TokenQuotes.WRAPPED_ETHER,
			token1quote: TokenQuotes.AVAX,
			token0Contract: getContractAddress(Token.WETH),
			token1Contract: getContractAddress(Token.AVAX),
			pairContract: '0x1274de0de2e9d9b1d0e06313c0e5edd01cc335ef',
			pairURL:
				'https://analytics-polygon.sushi.com/pairs/0x1274de0de2e9d9b1d0e06313c0e5edd01cc335ef'
		},
		strategyContractAddress: ''
	}
];
