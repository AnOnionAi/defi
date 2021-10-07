import type { VaultInfo } from '$lib/ts/types';
import addresses from './addresses.json';
import platforms from './platforms.json';
import { TokenQuotes } from '$lib/ts/types';
import env from '$lib/env';
import { Token } from '$lib/ts/types';
import { getContractAddress } from '$lib/utils/addressHelpers';
export const quickVaults: VaultInfo[] = [
	{
		pid: 0,
		depositFee: 0,
		withdrawalFee: 0.1,
		platform: platforms.QUICKSWAP,
		pair: {
			token0Name: 'WETH',
			token1Name: 'USDC',
			token0quote: TokenQuotes.WRAPPED_ETHER,
			token1quote: TokenQuotes.USDC,
			token0Contract: getContractAddress(Token.WETH),
			token1Contract: getContractAddress(Token.USDC),
			pairContract: 'Not Ready',
			pairURL: 'Not Ready'
		},
		strategyContractAddress: ''
	},
	{
		pid: 1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.1,
		pair: {
			token0Name: 'WETH',
			token1Name: 'WMATIC',
			token0quote: TokenQuotes.WRAPPED_ETHER,
			token1quote: TokenQuotes.WRAPPED_MATIC,
			token0Contract: getContractAddress(Token.WETH),
			token1Contract: getContractAddress(Token.WMATIC),
			pairContract: '0xadbF1854e5883eB8aa7BAf50705338739e558E5b',
			pairURL: 'Not ready'
		},
		strategyContractAddress: ''
	},
	{
		pid: 14,
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
		strategyContractAddress: '0x5a80f6fc727f7D0c060aeaAAb1640bb92FCfb30B'
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
			pairContract: '0x853ee4b2a13f8a742d64c8f088be7ba2131f670d',
			pairURL: 'https://polygonscan.com/address/0x853ee4b2a13f8a742d64c8f088be7ba2131f670d'
		},
		strategyContractAddress: 'LF'
	},
	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.0,
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
		strategyContractAddress: 'LF'
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.0,
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
		strategyContractAddress: 'LF'
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.0,
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
		strategyContractAddress: 'LF'
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.0,
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
		strategyContractAddress: 'LF'
	},



	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.0,
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
		strategyContractAddress: 'LF'
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.0,
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
		strategyContractAddress: 'LF'
	},



	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.0,
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
		strategyContractAddress: 'LF'
	},
	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.0,
		pair: {
			token0Name: 'DAI',
			token1Name: 'USDT',
			token0quote: TokenQuotes.DAI,
			token1quote: TokenQuotes.USDT,
			token0Contract: getContractAddress(Token.DAI),
			token1Contract: getContractAddress(Token.USDT),
			pairContract: '0x5ca6ca6c3709e1e6cfe74a50cf6b2b6ba2dadd67',
			pairURL: 'https://polygonscan.com/address/0x5ca6ca6c3709e1e6cfe74a50cf6b2b6ba2dadd67'
		},
		strategyContractAddress: 'LF'
	},

	{
		pid: -1,
		depositFee: 0,
		platform: platforms.QUICKSWAP,
		withdrawalFee: 0.0,
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
		strategyContractAddress: 'LF'
	},

];

export const sushiVaults: VaultInfo[] = [
	{
		pid: 3,
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
			pairContract: 'Not Ready',
			pairURL: 'Not Ready'
		},
		strategyContractAddress: ''
	},
	{
		pid: 4,
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
			pairContract: 'Not Ready',
			pairURL: 'Not ready'
		},
		strategyContractAddress: ''
	}
];
