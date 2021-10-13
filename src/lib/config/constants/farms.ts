import addresses from './addresses.json';
import type { PoolInfo } from '$lib/ts/types';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/ts/types';

export const farms: PoolInfo[] = [
	{
		pid: 0,
		tokenName: 'QUICK-LP',
		tokenAddr: getContractAddress(Token.ZYBERTOKEN),
		depositFee: 100
	},

	{
		pid: 1,
		tokenName: 'SUSHI-LP',
		tokenAddr: getContractAddress(Token.TESTLP),
		depositFee: 100
	},

	{
		pid: 2,
		tokenName: 'DYFN-LP',
		tokenAddr: getContractAddress(Token.DFYNTESTLP),
		depositFee: 100
	}
];
