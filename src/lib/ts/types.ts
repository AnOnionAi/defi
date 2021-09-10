export interface FarmConfig {
    pid: number
    lpSymbol: string
    lpAddresses: string
    tokenSymbol: string
    tokenAddresses: string
    multiplier?: string
    risk: number
  }


  export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  stakingTokenName: string
  stakingLimit?: number
  stakingTokenAddress?: string
  contractAddress: string
  poolCategory: string
  projectLink: string
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
}