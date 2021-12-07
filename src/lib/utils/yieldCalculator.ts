import BigNumber from "bignumber.js"


const BLOCKS_PER_YEAR = new BigNumber("15768400")


/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */ 
 export const getPoolApr = (
    stakingTokenPrice: number,
    rewardTokenPrice: number,
    totalStaked: number,
    tokenPerBlock: number,
  ): number => {
    const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
    const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
    return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
  }

