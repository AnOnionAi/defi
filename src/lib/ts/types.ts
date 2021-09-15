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
	token0Name: string,
	token1Name: string,
	token0quote: string,
	token1quote: string,
	token0Contract: string,
	token1Contract: string,
	pairContract: string,
	
}