import type { BigNumber } from 'ethers';

export interface FarmConfig {
	pid: number;
	lpSymbol: string;
	lpAddress: string;
	tokenSymbol: string;
	tokenAddresses: string;
	multiplier?: string;
}

export interface PoolInfo {
	tokenName: string;
	tokenImagePath: string;
	tokenAddr: string;
	pid: number;
}

export interface PoolConfig {
	isHidden: boolean;
	tokenApproved: boolean;
	userAcc: string;
	tokenAllowance: BigNumber;
	canStake: boolean;
	canWithdraw: boolean;
	canHarvest: boolean;
	userStakedTokens: BigNumber;
	userEarnings: BigNumber;
	poolTokenLiquidity: BigNumber;
	userBalance: BigNumber;
	wantWithdrawAmount: any;
}

export interface LPair {
	token0Name: string;
	token1Name: string;
	token0quote: string;
	token1quote: string;
	token1Contract: string;
	token0Contract: string;
	pairContract: string;
	pairURL: string;
}

export interface VaultInfo {
	pid: number;
	depositFee: number;
	withdrawalFee: number;
	platform: Platform;
	pair: LPair;
	strategyContractAddress: string;
}

export interface VaultState extends VaultInfo {
	tvl: number;
	apy: number;
	stakedAmount: number;
	userWalletBalance: number;
}

export interface Platform {
	name: string;
	brandColor: string;
	swapperURL: string;
}

export enum Token {
	AVAX = 'AVAX',
	AXS = 'AXS',
	AAVE = 'AAVE',
	UNIFACTORY = 'UNIFACTORY',
	UNIROUTER = 'UNIROUTER',
	MUSHTOKEN = 'MUSHTOKEN',
	MASTERCHEF = 'MASTERCHEF',
	ZYBERTOKEN = 'ZYBERTOKEN',
	TESTLP = 'TESTLP',
	SOL = 'SOL',
	DAI = 'DAI',
	CNTR = 'CNTR',
	LINK = 'LINK',
	DFYNTESTLP = 'DFYNTESTLP',
	FISHTOKEN = 'FISHTOKEN',
	WMATIC = 'WMATIC',
	WETH = 'WETH',
	WBTC = 'WBTC',
	SUSHI = 'SUSHI',
	QUICK = 'QUICK',
	DFYN = 'DFYN',
	MXNC = 'MXNC',
	DOGE = 'DOGE',
	USDC = 'USDC',
	USDT = 'USDT',
	CRYSTL = 'CRYSTL',
	VAULTCHEF = 'VAULTCHEF',
	DIVIDENDS = 'DIVIDENDS',
	IBBTC = 'IBBTC',
	GRT = 'GRT',
	MANA = 'MANA',
	CRV = 'CRV',
	QUICKLP = 'QUICKLP',
	SUSHILP = 'SUSHILP',
	CATLP = 'CATLP'
}

export enum TokenQuotes {
	CURVE = 'CRV',
	AVAX = 'AVAX',
	AXS = 'AXS',
	WRAPPED_ETHER = 'WETH',
	WRAPPED_MATIC = 'WMATIC',
	WRAPPED_BITCOIN = 'WBTC',
	IBBTC = 'IBBTC',
	GRT = 'GRT',
	MANA = 'MANA',
	CNTR = 'CNTR',
	LINK = 'LINK',
	SOL = 'SOL',
	USDC = 'USDC',
	USDT = 'USDT',
	AAVE = 'AAVE',
	DAI = 'DAI',
	QUICK = 'QUICK'
}

export type Notification = {
	text: String;
	position: String;
	type: String;
	removeAfter: number;
};

export interface VaultFilterFunction {
	filterFunction(...args: any): boolean;
	criteria: Criteria;
}

export enum Criteria {
	PLATFORM = 'PLATFORM',
	BALANCE = 'BALANCE',
	STAKED = 'STAKED',
	NAME = 'NAME',
	ORDER = 'ORDER',
	YIELD = 'YIELD'
}
