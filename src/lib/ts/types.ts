import type { BigNumber } from '@ethersproject/bignumber';

export interface FarmConfig {
	pid: number;
	lpSymbol: string;
	lpAddresses: string;
	tokenSymbol: string;
	tokenAddresses: string;
	multiplier?: string;
	risk: number;
}

export interface PoolInfo {
	tokenName: string;
	tokenAddr: string;
	depositFee: number;
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
	token1Contract: string
	token0Contract: string
	pairContract: string;
	pairURL: string;
}

export interface VaultInfo {
	pid: number;
	depositFee: number;
	whitdrawalFee: number;
	platform: Platform;
	pair: LPair;
	strategyContractAddress: string
}

export interface Platform {
	name: string;
	brandColor: string;
	swapperURL: string;
}

export enum Token {
  UNIFACTORY = "UNIFACTORY",
  UNIROUTER = "UNIROUTER",
  MUSHTOKEN = "MUSHTOKEN",
  MASTERCHEF = "MASTERCHEF",
  ZYBERTOKEN = "ZYBERTOKEN",
  TESTLP = "TESTLP",
  DFYNTESTLP = "DFYNTESTLP",
  FISHTOKEN = "FISHTOKEN",
  WMATIC = "WMATIC",
  WETH = "WETH",
  WBTC = "WBTC",
  SUSHI  = "SUSHI", 
  QUICK  = "QUICK", 
  DFYN  = "DFYN", 
  MXNC  = "MXNC", 
  DOGE  = "DOGE", 
  USDC  = "USDC", 
  USDT  = "USDT", 
  VAULTCHEF = "VAULTCHEF",
}

export enum TokenQuotes {
	WRAPPED_ETHER = "WETH",
	WRAPPED_MATIC = "WMATIC",
	WRAPPED_BITCOIN = "WBTC",
	USDC = "USDC",
	USDT = "USDT",
	AAVE = 'AAVE',
	DAI = "DAI",
	QUICK = "QUICK"
}

