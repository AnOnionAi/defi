import BigNumber from 'bignumber.js';

const BLOCKS_PER_YEAR = new BigNumber('15768400');

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
	tokenPerBlock: number
): number => {
	const totalRewardPricePerYear = new BigNumber(rewardTokenPrice)
		.times(tokenPerBlock)
		.times(BLOCKS_PER_YEAR);
	const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked);
	const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);
	return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber();
};


/**
 * Given APR returns APY
 * @param apr APR as percentage
 * @param compoundFrequency how many compounds per day
 * @param days if other than 365 adjusts (A)PY for period less than a year
 * @param performanceFee performance fee as percentage
 * @returns APY as decimal
 */
 export const getApy = (apr: number, compoundFrequency = 1, days = 365, performanceFee = 0) => {
	const daysAsDecimalOfYear = days / 365
	const aprAsDecimal = apr / 100
	const timesCompounded = 365 * compoundFrequency
	let apyAsDecimal = (apr / 100) * daysAsDecimalOfYear
	if (timesCompounded > 0) {
	  apyAsDecimal = (1 + aprAsDecimal / timesCompounded) ** (timesCompounded * daysAsDecimalOfYear) - 1
	}
	if (performanceFee) {
	  const performanceFeeAsDecimal = performanceFee / 100
	  const takenAsPerformanceFee = apyAsDecimal * performanceFeeAsDecimal
	  apyAsDecimal -= takenAsPerformanceFee
	}
	return apyAsDecimal
  }
