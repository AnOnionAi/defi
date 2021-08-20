import testLPABI from '../abi/TEST-LP.json';
import zyberLPABI from '../abi/ZyberToken.json';
import DYFNLP from '../abi/DYFN-LP.json';
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
		lpTokenAddress: '0x14d9612Eb4aE862a95e8e66792649857A02320C4',
		abiToken: zyberLPABI,
		allocPoint: 1,
		depositFee: 100
	},

	{
		pid: 1,
		lpTokenName: 'TEST-LP',
		lpTokenAddress: '0x996Ee77CA2434D46dF655062FBBFe5D143Ae24cf',
		abiToken: testLPABI,
		allocPoint: 1,
		depositFee: 100
	},

	{
		pid: 2,
		lpTokenName: 'DYFN-LP',
		lpTokenAddress: '0xdC0A4994662cd070277AD935fB652A8d09A1522A',
		abiToken: DYFNLP,
		allocPoint: 1,
		depositFee: 100
	}
];
