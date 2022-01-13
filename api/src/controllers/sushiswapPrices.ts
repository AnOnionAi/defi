import {Request,Response} from "express"
import { hasContractLength } from "../lib/utils"

export const getTokenPrice = (req:Request,res:Response) => {
    const {id}  = req.params

    if(!id){
        res.status(404).json({
            error: "Request not valid, you must send a address."
        })
    }
    if(!hasContractLength(id)){
        res.status(404).json({
            error: "Request not valid, you must send a 42 char long address."
        })
    }
    

    res.json({
        ok: true,
        msg: "ERC20 TOKEN SUSHISWAP"
    })
}

export const getSushiswapLpTokenPrice = (req:Request,res:Response) => {
    res.json({
        ok: true,
        msg: "LP TOKENS SUSHISWAP"
    })
}


export const getSushiswapFarmAPY = (req:Request,res:Response) => {
    res.json({
        ok: true,
        msg: "SUSHI APY"
    })
}