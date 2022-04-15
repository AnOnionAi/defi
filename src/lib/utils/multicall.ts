import MultiCall from '@indexed-finance/multicall';
import { web3Provider } from './web3Utils';

export const multiCallClient = new MultiCall(web3Provider);
