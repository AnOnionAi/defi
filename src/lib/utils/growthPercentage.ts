import { null_to_empty } from 'svelte/internal';

export interface GrowthInfo {
	yesterdayPrice?: number | null;
	todayGrowth?: number | null;
	oneWeekAgoPrice?: number | null;
	weeklyGrowth?: number | null;
	oneMonthAgoPrice?: number | null;
	monthlyGrowth?: number | null;
}

const errorHistoryNotFound: GrowthInfo = {
	yesterdayPrice: null,
	todayGrowth: null,
	oneWeekAgoPrice: null,
	weeklyGrowth: null,
	oneMonthAgoPrice: null,
	monthlyGrowth: null
};

export const calculateGrowth = (historicalData: Array<any>): GrowthInfo => {
	const [lastDayLog, yesterdayLog] = historicalData;
	const lastWeekLog = historicalData[7];
	const lastMonthLog = historicalData[31];

	if (!(lastDayLog && yesterdayLog)) {
		return errorHistoryNotFound;
	}

	if (!lastWeekLog) {
		return {
			yesterdayPrice: yesterdayLog.price,
			todayGrowth:
				((lastDayLog.price - yesterdayLog.price) / yesterdayLog.price) * 100,
			oneWeekAgoPrice: null,
			oneMonthAgoPrice: null,
			monthlyGrowth: null,
			weeklyGrowth: null
		};
	}

	if (!lastMonthLog) {
		return {
			yesterdayPrice: yesterdayLog.price,
			todayGrowth:
				((lastDayLog.price - yesterdayLog.price) / yesterdayLog.price) * 100,
			oneWeekAgoPrice: null,
			oneMonthAgoPrice: null,
			monthlyGrowth: null,
			weeklyGrowth: null
		};
	}

	return {
		yesterdayPrice: yesterdayLog.price,
		todayGrowth:
			((lastDayLog.price - yesterdayLog.price) / yesterdayLog.price) * 100,
		oneWeekAgoPrice: lastWeekLog.price,
		weeklyGrowth:
			((lastDayLog.price - lastWeekLog.price) / lastWeekLog.price) * 100,
		oneMonthAgoPrice: lastMonthLog.price,
		monthlyGrowth:
			((lastDayLog.price - lastMonthLog.price) / lastMonthLog.price) * 100
	};
};
