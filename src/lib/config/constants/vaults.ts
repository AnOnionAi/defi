import type { VaultInfo } from "$lib/ts/types";
import addresses from "./addresses.json"
import platforms from "./platforms.json"
import  {TokenQuotes} from "$lib/ts/types"
import env from "$lib/env"
import {Token}  from "$lib/ts/types";
import { getContractAddress } from "$lib/utils/addressHelpers";
export const quickVaults: VaultInfo[] = [
    {
        pid:0,
        depositFee: 0,
        whitdrawalFee: 0.1,
        platform : platforms.QUICKSWAP,
        pair : {
            token0Name: "WETH",
            token1Name: "USDC",
            token0quote: TokenQuotes.WRAPPED_ETHER,
            token1quote: TokenQuotes.USDC,
            token0Contract: getContractAddress(Token.WETH),
            token1Contract: getContractAddress(Token.USDC),
            pairContract: "Not Ready",
            pairURL: "Not Ready"
        }
    },
    {
        pid: 1,
        depositFee:0,
        platform: platforms.QUICKSWAP,
        whitdrawalFee:0.1,
        pair: {
            token0Name: "WETH",
            token1Name: "WMATIC",
            token0quote: TokenQuotes.WRAPPED_ETHER,
            token1quote: TokenQuotes.WRAPPED_MATIC,
            token0Contract:getContractAddress(Token.WETH),
            token1Contract:getContractAddress(Token.WMATIC),
            pairContract: "0xadbF1854e5883eB8aa7BAf50705338739e558E5b",
            pairURL: "Not ready"
        }
    },
   
]


export const sushiVaults: VaultInfo[] = [
    {
        pid:3,
        depositFee: 0,
        whitdrawalFee:0.1,
        platform : platforms.SUSHISWAP,
        pair : {
            token0Name: "WETH",
            token1Name: "USDC",
            token0quote: TokenQuotes.WRAPPED_ETHER,
            token1quote: TokenQuotes.USDC,
            token0Contract: getContractAddress(Token.WETH),
            token1Contract: getContractAddress(Token.USDC),
            pairContract: "Not Ready",
            pairURL: "Not Ready"
        }
    },
    {
        pid: 4,
        depositFee:0,
        whitdrawalFee:0.1,
        platform: platforms.SUSHISWAP,
        pair: {
            token0Name: "WETH",
            token1Name: "WMATIC",
            token0quote: TokenQuotes.WRAPPED_ETHER,
            token1quote: TokenQuotes.WRAPPED_MATIC,
            token0Contract:getContractAddress(Token.WETH),
            token1Contract: getContractAddress(Token.WMATIC),
            pairContract: "Not Ready",
            pairURL: "Not ready"
        }
    }
]