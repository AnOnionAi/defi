import { ethers, BigNumber } from 'ethers';
import UNIV2ABI from '$lib/config/abi/IUniswapV2Pair.json';
import ERC20ABI from '$lib/config/abi/ERC20.json';
import { Provider } from './web3Helpers';
import { getContractAddress } from './addressHelpers';
import { Token } from '$lib/ts/types';
import { tokenPrice } from '$lib/stores/NativeTokenPrice';
import { BURN_ADDRESS, MUSHSYMBOL, SUSHI_FACTORY } from '$lib/config';
import { getTokenPriceUSD } from './coinGecko';
import { getFactoryContract } from './contractHelpers';
import { getERC20Contract } from './contracts';
import { getErc20TokenUsdPrice } from './tokensPrice';

let mushTokenPriceUSD = 0;

tokenPrice.subscribe((tokenPrice) => {
	mushTokenPriceUSD = tokenPrice;
});

const getTokenContract = (address: string) => {
	return new ethers.Contract(address, ERC20ABI, Provider.getProviderSingleton());
};

export const getUniPairTokenContract = (address: string) => {
	return new ethers.Contract(address, UNIV2ABI, Provider.getProviderSingleton());
};

export const getPriceOfMushPair = async (address: string) => {
	const mushAddress = getContractAddress(Token.MUSHTOKEN);
	const pairContract = getUniPairTokenContract(address);
	const totalSupply = await pairContract.totalSupply();
	const tokenAddresses = await getTokensFromPair(address);
	const reserves = await pairContract.getReserves();

	const token0 = {
		address: tokenAddresses[0],
		reserve: reserves[0],
		...(await getTokenInformation(tokenAddresses[0]))
	};
	const token1 = {
		address: tokenAddresses[1],
		reserve: reserves[1],
		...(await getTokenInformation(tokenAddresses[1]))
	};

	const mushToken = token0.address == mushAddress ? token0 : token1;

	const mushReserveNumber = parseFloat(ethers.utils.formatEther(mushToken.reserve));
	const totalValueOfLiquidityPool = mushReserveNumber * mushTokenPriceUSD * 2;
	const totalSupplyNumber = totalSupply / 1e18;
	const oneLpTokenPrice = totalValueOfLiquidityPool / totalSupplyNumber;
	return oneLpTokenPrice;
};

export const getTokenInformation = async (tokenAdress: string) => {
	const tokenContract = getTokenContract(tokenAdress);
	const decimals = tokenContract.decimals();
	const symbol = tokenContract.name();
	const tokenInfo = await Promise.all([decimals, symbol]);
	return { tokenDecimals: tokenInfo[0], tokenSymbol: tokenInfo[1] };
};

export const getTokensFromPair = async (pairAddress):Promise<string[]> => {
	const pairContract = getUniPairTokenContract(pairAddress);
	const tkn0 = pairContract.token0();
	const tkn1 = pairContract.token1();
	return Promise.all([tkn0, tkn1]);
};


export const getReservesFromPair = async(pairAddress):Promise<number[]> => { 
	const [token0Address,token1Address] = await getTokensFromPair(pairAddress)
	const pairContract = getUniPairTokenContract(pairAddress);
	const [reservesToken0,reservesToken1]:Array<BigNumber> = await pairContract.getReserves();
	const token0Contract = getERC20Contract(token0Address);
	const token1Contract = getERC20Contract(token1Address);
	const token0DecimalsPromise = token0Contract.decimals();
	const token1DecimalsPromise = token1Contract.decimals();
	const [token0Decimals,token1Decimals] = await Promise.all([token0DecimalsPromise,token1DecimalsPromise]);
	const token0Reserves = parseFloat(ethers.utils.formatUnits(reservesToken0,token0Decimals));
	const token1Reserves = parseFloat(ethers.utils.formatUnits(reservesToken1,token1Decimals));
	return [token0Reserves,token1Reserves];
} 

export const getCirculatingSupply = async(pairAddress):Promise<number> => {
	const pairContract = getUniPairTokenContract(pairAddress);
	const totalSupplyPromise = pairContract.totalSupply()
	const burnedSupplyPromise = pairContract.balanceOf(BURN_ADDRESS)
	const [totalSupply,burnedSupply]:Array<BigNumber> = await Promise.all([totalSupplyPromise,burnedSupplyPromise])
	const circSupply = totalSupply.sub(burnedSupply);
	const circulatingSupply = parseFloat(ethers.utils.formatEther(circSupply))
	console.log(circulatingSupply);
	return circulatingSupply
}


export const getLpPrice = (totalValueOfLiquidityPool:number,circulatingSupply:number):number => {
	console.log("TVL: ",totalValueOfLiquidityPool)
	console.log("Circulating Supply",circulatingSupply);
	
 return totalValueOfLiquidityPool/circulatingSupply
}


