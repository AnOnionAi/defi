import addresses from './addresses.json';
import type { PoolInfo } from '$lib/ts/types';
import { getContractAddress } from '$lib/utils/addressHelpers';
import { Token } from '$lib/ts/types';

export const farms: PoolInfo[] = [
/* 		{
		pid: 0,
		tokenImagePath: '/vaultTokensIcons/quick.svg',
		tokenName: 'QUICK-LP',
		tokenAddr: getContractAddress(Token.QUICKLP),
		depositFee: 100
	}, 
 */
	{
		pid: 1,
		tokenImagePath: '/mush-usdc.svg',
		tokenName: 'MUSH-USDC',
		tokenAddr: getContractAddress(Token.SUSHILP),
	}
	/* , 
	{
		pid: 2,
		tokenImagePath: '/polycatLogo.png',
		tokenName: 'CAT-LP',
		tokenAddr: getContractAddress(Token.CATLP),
		depositFee: 100
	} */
];
