import {Router} from "express";
import { getTokenPrice ,getSushiswapLpTokenPrice} from "../controllers/sushiswapPrices";

const router = Router();


router.get("/tokens/price/:id",getTokenPrice)
router.get("/lp/price/",getSushiswapLpTokenPrice)


export default router;