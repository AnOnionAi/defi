import type { VaultInfo } from "$lib/ts/types";
import addresses from "./addresses.json"
import platforms from "./platforms.json"
import  {TokenQuotes} from "$lib/ts/types"
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
            token0Contract: addresses.WETH.POLYGON,
            token1Contract: addresses.USDC.POLYGON,
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
            token0Contract:addresses.WETH.POLYGON,
            token1Contract: addresses.WMATIC.POLYGON,
            pairContract: "Not Ready",
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
            token0Contract: addresses.WETH.POLYGON,
            token1Contract: addresses.USDC.POLYGON,
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
            token0Contract:addresses.WETH.POLYGON,
            token1Contract: addresses.WMATIC.POLYGON,
            pairContract: "Not Ready",
            pairURL: "Not ready"
        }
    }
]