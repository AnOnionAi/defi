import type { BigNumber } from 'ethers';
import { getMushStrategyContract } from './contracts';
import { ethers } from 'ethers';

export const getUserInfo = async (address: string): Promise<Array<BigNumber>> => {
	const mushStrategy = getMushStrategyContract();
	const [shares, rewardDebt] = await mushStrategy.userInfo(address);
	return [shares, rewardDebt];
};

export const harvest = async () => {
	const mushStrategy = getMushStrategyContract();
	return await mushStrategy.harvest();
};

export const getSharesTotal = async (): Promise<BigNumber> => {
	const mushStrategy = getMushStrategyContract();
	const sharesTotal = await mushStrategy.sharesTotal();
	return sharesTotal;
};

export const wantLockedTotal = async (): Promise<BigNumber> => {
	const mushStrategy = getMushStrategyContract();
	const totalLocked = await mushStrategy.wantLockedTotal();
	return totalLocked;
};

export const getUsdcPerShare = async (): Promise<BigNumber> => {
	const mushStrategy = getMushStrategyContract();
	const accUsdPerShare = await mushStrategy.accUsdPerShare();
	return accUsdPerShare;
};

export const getPendingReward = async (address: string) => {
	const promiseGetUserInfo = getUserInfo(address);
	const usdcPerSharePromise = getUsdcPerShare();
	const sharesTotalPromise = getSharesTotal();
	const lockedTotalPromise = wantLockedTotal();
	const [userInfo, usdcPerShare, sharesTotal, lockedTotal] = await Promise.all([
		promiseGetUserInfo,
		usdcPerSharePromise,
		sharesTotalPromise,
		lockedTotalPromise
	]);
	const [userShares, rewardDebt] = userInfo;

	const pending = userShares.mul(usdcPerShare).div(ethers.utils.parseEther('1')).sub(rewardDebt);

	return pending;
};