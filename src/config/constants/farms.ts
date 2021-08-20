import testLPABI from '../abi/TEST-LP.json';
import zyberLPABI from '../abi/ZyberToken.json';
import DYFNLP from '../abi/DYFN-LP.json';
import { addresses } from './addresses';


export const farms: {
	pid: number;
	lpTokenName: string;
	lpTokenAddress: string;
	abiToken: any;
	depositFee: number;
	allocPoint: number;
}[] = [
	{
		pid: 0,
		lpTokenName: 'ZyberToken',
		lpTokenAddress: addresses.ZyberToken.TEST,
		abiToken: zyberLPABI,
		allocPoint: 1,
		depositFee: 100
	},

	{
		pid: 1,
		lpTokenName: 'TEST-LP',
		lpTokenAddress: addresses.TESTLP.TEST,
		abiToken: testLPABI,
		allocPoint: 1,
		depositFee: 100
	},

	{
		pid: 2,
		lpTokenName: 'DYFN-LP',
		lpTokenAddress: addresses['DYFNTESTLP'].TEST,
		abiToken: DYFNLP,
		allocPoint: 1,
		depositFee: 100
	}
];
