import { SUSHI_FACTORY } from "$lib/config";
import { Token } from "$lib/ts/types";
import { BigNumber, ethers } from "ethers";
import { getContractAddress } from "./addressHelpers";
import { getErc20Contract, getFactoryContract, getPairContract } from "./contractHelpers";
import { getCirculatingSupply, getLpPrice, getReservesFromPair, getTokensFromPair } from "./lpTokenUtils";
import { Provider } from "./web3Helpers";
import BN from "bignumber.js"

export const getMaticUsdPrice = async():Promise<number> => {
    const response = await fetch("https://api.polygonscan.com/api?module=stats&action=maticprice&apikey=FYERG7NFB92RG86PHZ67KSFM4SXZJ1AZB9")
    const data = await response.json()
    const {result} = data
    return parseFloat(result.maticusd);
}


export const getErc20TokenUsdPrice = async(tokenAddress):Promise<number> =>{
    const wmaticAddress = getContractAddress(Token.WMATIC)
    if(tokenAddress == wmaticAddress){
        return getMaticUsdPrice();
    }
    try{
        const erc20Contract = getErc20Contract(tokenAddress,Provider.getProviderSingleton())
        const factory = getFactoryContract(SUSHI_FACTORY,Provider.getProviderSingleton())
        const tokenWmaticPairAddress = await factory.getPair(wmaticAddress,tokenAddress)
        const lpToken = await getPairContract(tokenWmaticPairAddress,Provider.getProviderSingleton());
        const responseTokens:Array<string> = await getTokensFromPair(tokenWmaticPairAddress)
        const tokenPair = responseTokens.map(address => address.toLowerCase());
        const erc20Index = tokenAddress == tokenPair[0] ? 0 : 1;
        const wmaticIndex = wmaticAddress == tokenPair[0] ? 0 : 1;
        const reserves = await lpToken.getReserves();
        const erc20reserves:BigNumber = reserves[erc20Index];
        const wmaticReserves:BigNumber = reserves[wmaticIndex];
        const tokenDecimals = await erc20Contract.decimals();
        const erc20FormattedReserves = new BN(ethers.utils.formatUnits(erc20reserves,tokenDecimals))
        const wmaticFormattedReserves = new BN (ethers.utils.formatEther(wmaticReserves));
        const maticPrice = await getMaticUsdPrice();
        const bnMaticPrice = new BN(maticPrice)
        const mult = wmaticFormattedReserves.div(erc20FormattedReserves);
        const price = mult.times(bnMaticPrice);
        return price.toNumber()
    }catch(error){
        throw new Error("Unable to get the token price in USD")
    }
    
}

export const getPriceOfEachTokenFromPair = async(pairAddress):Promise<number[]> =>  { 
	const [token0Address,token1Address] = await getTokensFromPair(pairAddress);
	const tkn0priceprom = getErc20TokenUsdPrice(token0Address);
	const tkn1priceprom = getErc20TokenUsdPrice(token1Address);
	return Promise.all([tkn0priceprom,tkn1priceprom])
} 



export const getLpTokenUsdWorth = async(lpTokenAddress: string) => {
    const tokenPricesProm = getPriceOfEachTokenFromPair(lpTokenAddress)
    const tokenReservesProm = getReservesFromPair(lpTokenAddress)
    const [[token0PriceUSD,token1PriceUSD],[token0Reserves,token1Reserves]] = await Promise.all([tokenPricesProm,tokenReservesProm]);
    const token0WorthLockedInPool = token0PriceUSD * token0Reserves;
    const token1WorthLockedInPool = token1PriceUSD * token1Reserves;
    const totalLiquidityPoolWorth = token0WorthLockedInPool + token1WorthLockedInPool;
    const circulatingLpTokenSupply = await  getCirculatingSupply(lpTokenAddress);
    const lpPrice = getLpPrice(totalLiquidityPoolWorth,circulatingLpTokenSupply)
    return lpPrice;
}

