
import { addresses } from './addresses';

export const farms: {
	pid: number;
	tokenName: string;
	tokenAddr: string;
	depositFee: number;
}[] = [
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
		tokenAddr: addresses['DYFNTESTLP'].TEST,
		depositFee: 100
	}
];
