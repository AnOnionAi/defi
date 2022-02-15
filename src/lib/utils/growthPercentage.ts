export interface GrowthInfo {
    yesterdayPrice: number | null,
    todayGrowth: number | null,
    oneWeekAgoPrice: number | null,
    weeklyGrowth: number | null,
    oneMonthAgoPrice: number | null,
    monthlyGrowth: number | null,
}

const errorHistoryNotFound:GrowthInfo = {
    yesterdayPrice:  null,
    todayGrowth:  null,
    oneWeekAgoPrice:  null,
    weeklyGrowth:  null,
    oneMonthAgoPrice:  null,
    monthlyGrowth:  null
}

export const calculateGrowth = (historicalData: Array<any>):GrowthInfo => {
    const [lastDayLog] = historicalData;
    const lastDate = new Date(lastDayLog.date);
    const oneDayBeforeLastDate = new Date(lastDate);
    const oneWeekBeforeLastDate = new Date(lastDate);
    const oneMonthBeforeLastDate = new Date(lastDate);
    oneDayBeforeLastDate.setDate(oneDayBeforeLastDate.getDate()-1);
    oneWeekBeforeLastDate.setDate(oneDayBeforeLastDate.getDate()-7);
    oneMonthBeforeLastDate.setDate(oneDayBeforeLastDate.getDate()-30);

    const punctualDateStamps = [oneDayBeforeLastDate.getTime(),oneWeekBeforeLastDate.getTime(),oneMonthBeforeLastDate.getTime()];

   const wantedLogs =  historicalData.filter(datePriceLog=> punctualDateStamps.includes(new Date(datePriceLog.date).getTime()));

    if(wantedLogs.length == 0) return errorHistoryNotFound;

   const yesterdayLog = wantedLogs.find(log => new Date(log.date).getTime() == oneDayBeforeLastDate.getTime()) || null
   const lastWeekLog = wantedLogs.find(log => new Date(log.date).getTime() == oneWeekBeforeLastDate.getTime()) || null
   const lastMonthLog = wantedLogs.find(log => new Date(log.date).getTime() == oneMonthBeforeLastDate.getTime()) || null

   const todayGrowth = ((lastDayLog.price - yesterdayLog.price) / yesterdayLog.price) * 100
   const weeklyGrowth = ((lastDayLog.price - lastWeekLog.price) / lastWeekLog.price) * 100
   const monthlyGrowth = ((lastDayLog.price - lastMonthLog.price) / lastMonthLog.price) * 100

   return {
    yesterdayPrice: yesterdayLog.price,
    todayGrowth: todayGrowth,
    oneWeekAgoPrice: lastWeekLog.price,
    weeklyGrowth: weeklyGrowth,
    oneMonthAgoPrice: lastMonthLog.price,
    monthlyGrowth: monthlyGrowth 
   }
}