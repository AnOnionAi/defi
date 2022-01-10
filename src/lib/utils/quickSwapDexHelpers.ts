import { QUICKSWAP_ROUTER } from "$lib/config"
import { Token } from "$lib/ts/types"
import { ethers } from "ethers"
import { getContractAddress } from "./addressHelpers"
import { getRouterContract } from "./contractHelpers"
import { getCirculatingSupply, getLpPrice, getReservesFromPair, getTokensFromPair } from "./lpTokenUtils"
import { getMaticUsdPrice } from "./tokensPrice"

/**
 * Retrieves the fiat worth of a LP token within Quickswap DEX, since we're not using UniSDK it doesn't follow the most optimal exhanging token route.
 * Value of 1LP Token = Total Value of Liquidity Pool / Circulating Supply of the LP Token
 * Total Value of Liquidity Pool = Reserves of each token * Price of each token.
 */
export const getQuickswapLPTokenPrice = async(lpTokenAdress) => {
    const tokensPromise = getTokensFromPair(lpTokenAdress)
    const reservesPromise =  getReservesFromPair(lpTokenAdress)
    const supplyPromise = getCirculatingSupply(lpTokenAdress)
    const [[token0Address,token1Address],[token0Reserves,token1Reserves],totalSupply] = await Promise.all([tokensPromise,reservesPromise,supplyPromise]);
    console.log(token0Address,token1Address,token0Reserves,token1Reserves,totalSupply);
    const token0PricePromise = getTokenPriceUSDQuickSwap(token0Address);
    const token1PricePromise = getTokenPriceUSDQuickSwap(token1Address);
    console.log("here")
    const [token0Price,token1Price] = await Promise.all([token0PricePromise,token1PricePromise]);
    const tvlToken0 = token0Reserves * token0Price;
    const tvlToken1 = token1Reserves * token1Reserves;
    const tvlLP = tvlToken0 * tvlToken1;
    return getLpPrice(tvlLP,totalSupply)
}



/**
 * Retrieves the fiat worth of a erc20 token within Quickswap DEX, since we're not using UniSDK it doesn't follow the most optimal exhanging token route. %
 */
export const getTokenPriceUSDQuickSwap = async(tokenAddress:string):Promise<number> => {
    console.log(tokenAddress)
    const wmaticAddress = getContractAddress(Token.WMATIC)
    if(tokenAddress.toLowerCase() == wmaticAddress){
        return getMaticUsdPrice();
    }
    const router =  getRouterContract(QUICKSWAP_ROUTER);
    const [amountIn,wmaticAmount,amountOfUSDCPerToken] = await  router.getAmountsOut("1000000000000000000",[tokenAddress,"0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270","0x2791bca1f2de4661ed88a30c99a7a9449aa84174"])
    const tokenUsdPrice = parseFloat(ethers.utils.formatUnits(amountOfUSDCPerToken,6));
    return tokenUsdPrice;
}

