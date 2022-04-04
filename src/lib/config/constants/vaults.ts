import type { VaultInfo } from '$lib/types/types';
import platforms from './platforms.json';
import { TokenQuotes } from '$lib/types/types';
import { Token } from '$lib/types/types';
import { getContractAddress } from '$lib/utils/addressHelpers';

export const quickVaults: VaultInfo[] = [];

export const sushiVaults: VaultInfo[] = [
	{
		pid: 1,
		depositFee: 0,
		withdrawalFee: 0,
		pair: {
			token0Name: 'WMATIC',
			token1Name: 'WETH',
			token0quote: 'WMATIC',
			token1quote: 'WETH',
			token0Contract: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
			token1Contract: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
			pairContract: '0xc4e595acDD7d12feC385E5dA5D43160e8A0bAC0E',
			pairURL:
				'https://polygonscan.com/address/0xc4e595acDD7d12feC385E5dA5D43160e8A0bAC0E'
		},
		platform: platforms.SUSHISWAP,
		strategyContractAddress: '0x09B5b956d60302E320770f50Fbe6781d54B4c4ba'
	},
	{
		pid: 3,
		depositFee: 0,
		withdrawalFee: 0,
		pair: {
			token0Name: 'WBTC',
			token1Name: 'WETH',
			token0quote: 'WBTC',
			token1quote: 'WETH',
			token0Contract: '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6',
			token1Contract: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
			pairContract: '0xE62Ec2e799305E0D367b0Cc3ee2CdA135bF89816',
			pairURL:
				'https://polygonscan.com/address/0xE62Ec2e799305E0D367b0Cc3ee2CdA135bF89816'
		},
		platform: platforms.SUSHISWAP,
		strategyContractAddress: '0xEEA008335c0Ae915f4e380af77715eA187771eaC'
	},

	{
		pid: 4,
		depositFee: 0,
		withdrawalFee: 0,
		pair: {
			token0Name: 'USDC',
			token1Name: 'WETH',
			token0quote: 'USDC',
			token1quote: 'WETH',
			token0Contract: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
			token1Contract: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
			pairContract: '0x34965ba0ac2451A34a0471F04CCa3F990b8dea27',
			pairURL:
				'https://polygonscan.com/address/0x34965ba0ac2451A34a0471F04CCa3F990b8dea27'
		},
		platform: platforms.SUSHISWAP,
		strategyContractAddress: '0x162d00792d4426da288684FaB8afe45100F4e716'
	},

	{
		pid: 5,
		depositFee: 0,
		withdrawalFee: 0,
		pair: {
			token0Name: 'USDC',
			token1Name: 'USDT',
			token0quote: 'USDC',
			token1quote: 'USDT',
			token0Contract: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
			token1Contract: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
			pairContract: '0x4B1F1e2435A9C96f7330FAea190Ef6A7C8D70001',
			pairURL:
				'https://polygonscan.com/address/0x4B1F1e2435A9C96f7330FAea190Ef6A7C8D70001'
		},
		platform: platforms.SUSHISWAP,
		strategyContractAddress: '0x1510ccbB03275bD4277A1488c3A3fB0f93f8c6ee'
	}
];
