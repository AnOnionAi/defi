import  addresses  from './addresses.json';
import type {PoolInfo} from "$lib/ts/types"

export const farms:PoolInfo[] = [
	{
		pid: 0,
		tokenName: 'QUICK-LP',
		tokenAddr: addresses.ZyberToken.TEST,
		depositFee: 100
	},

	{
		pid: 1,
		tokenName: 'SUSHI-LP',
		tokenAddr: addresses.TESTLP.TEST,
		depositFee: 100
	},

	{
		pid: 2,
		tokenName: 'DYFN-LP',
		tokenAddr: addresses.DYFNTESTLP.TEST,
		depositFee: 100
	}
];
