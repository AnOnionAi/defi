import addresses from './addresses.json';
import type { PoolInfo } from '$lib/ts/types';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/ts/types';

export const farms: PoolInfo[] = [
	{
		pid: 0,
		tokenImagePath: '/static/vaultTokensIcons/quick.svg',
		tokenName: 'QUICK-LP',
		tokenAddr: getContractAddress(Token.QUICKLP),
		depositFee: 100
	},

	{
		pid: 1,
		tokenImagePath: '/static/sushi.png',
		tokenName: 'SUSHI-LP',
		tokenAddr: getContractAddress(Token.SUSHILP),
		depositFee: 100
	},

	{
		pid: 2,
		tokenImagePath: '/static/polycatLogo.png',
		tokenName: 'CAT-LP',
		tokenAddr: getContractAddress(Token.CATLP),
		depositFee: 100
	}
];
