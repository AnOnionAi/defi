import {Token,Fetcher,Route,WETH,ChainId, Trade,TradeType, TokenAmount, CurrencyAmount, Currency} from "quickswap-sdk"
import polygonProvider from "../providers"

const chainId = ChainId.MATIC;

export const calculateTradePrice = async(tokenAddress: string) => {
    try{
    const token = await Fetcher.fetchTokenData(chainId,tokenAddress,polygonProvider);
    const wmatic = WETH[chainId];
    const pair = await Fetcher.fetchPairData(token,wmatic,polygonProvider);
    const route = new Route([pair],wmatic);
    return route.midPrice.invert().toSignificant(6)
    }catch(e){
        console.log("Token isn't avaliable within Quickswap Dex")
    }
}