export interface GrowthInfo {
	yesterdayPrice: number | null;
	todayGrowth: number | null;
	oneWeekAgoPrice: number | null;
	weeklyGrowth: number | null;
	oneMonthAgoPrice: number | null;
	monthlyGrowth: number | null;
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

	const todayGrowth =
		((lastDayLog.price - yesterdayLog.price) / yesterdayLog.price) * 100;
	const weeklyGrowth =
		((lastDayLog.price - lastWeekLog.price) / lastWeekLog.price) * 100;
	const monthlyGrowth =
		((lastDayLog.price - lastMonthLog.price) / lastMonthLog.price) * 100;

	return {
		yesterdayPrice: yesterdayLog.price,
		todayGrowth: todayGrowth,
		oneWeekAgoPrice: lastWeekLog.price,
		weeklyGrowth: weeklyGrowth,
		oneMonthAgoPrice: lastMonthLog.price,
		monthlyGrowth: monthlyGrowth
	};
};
