import Server from "./models/server";
import web3Provider from "./lib/providers"
import { calculateTradePrice } from "./lib/quickswap-dex/executionPrice";

/* const expressServer = new Server();
expressServer.listen(); */

(async()=>{
    console.log(await calculateTradePrice("0xd6df932a45c0f255f85145f286ea0b292b21c90b"))

})()
/* import {ethers, providers} from "ethers";
import {Token,Fetcher,Route,WETH,ChainId, Trade,TradeType, TokenAmount, CurrencyAmount, Currency} from "quickswap-sdk"
CurrencyAmount
console.log("START")
//USDC: 
const usdcAddress = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
const addyAddress = "0xc3fdbadc7c795ef1d6ba111e06ff8f16a20ea539";
const aaveAddress = "0xd6df932a45c0f255f85145f286ea0b292b21c90b";
const wethAddress = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619";
const provider = new ethers.providers.JsonRpcProvider("https://rpc-mainnet.maticvigil.com/")

const wmatic = WETH[ChainId.MATIC];
console.log(wmatic)
const usdc = new Token(ChainId.MATIC,usdcAddress,6,"USDC","USDC")
const addy = new Token(ChainId.MATIC,addyAddress,18,"ADDY","ADDY")
const aave = new Token(ChainId.MATIC,aaveAddress,18,"AAVE","AAVE")
const weth = new Token(ChainId.MATIC,wethAddress,18,"WETH","WETH");

async function main () {
    const pair1 = await Fetcher.fetchPairData(aave,weth,provider);
    const pair2 = await Fetcher.fetchPairData(weth,wmatic,provider)
    console.log("ALL DONE")
    const bestTrade = Trade.bestTradeExactIn([pair1,pair2],new TokenAmount(aave,"1000000000000000000"),wmatic)
    const price = bestTrade[0].executionPrice.toSignificant(6)
    console.log(price)
}



main() */