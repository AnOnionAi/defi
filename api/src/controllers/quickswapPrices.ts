import {Request,Response} from "express"

export const getTokenPrice = (req:Request,res:Response) => {
    res.json({
        ok: true,
        msg: "ERC20 TOKEN QUICKSWAP"
    })
}

export const getQuickswapLpTokenPrice = (req:Request,res:Response) => {
    res.json({
        ok: true,
        msg: "LP TOKEN QUICKSWAP"
    })
}

export const getQuickswapFarmAPY = (req:Request,res:Response) =>{
    res.json({
        ok: true,
        msg: "SUSHI APY"
    })
}