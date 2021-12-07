import { ethers } from "ethers"
import UNIV2ABI from "$lib/config/abi/IUniswapV2Pair.json"
import {Token,ChainId,WETH9,Route, Pair  } from "@sushiswap/sdk"
import { Provider } from "./web3Helpers"

export const getUniPairTokenContract = (address : string) => {
return new ethers.Contract(address,UNIV2ABI,Provider.getProviderSingleton())
}

export const testSushiSdk = () => {
const tokenA = WETH9[ChainId.MATIC];
const tokenB = new Token(ChainId.MATIC,"0x627F699300A9D693FBB84F9Be0118D17A1387D4e",18,"ZTEST","ZTEST");
const pairAddress = Pair.getAddress(tokenA,tokenB)
return pairAddress;
}


