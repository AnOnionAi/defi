import {Router} from "express";
import { getTokenPrice ,getQuickswapLpTokenPrice} from "../controllers/quickswapPrices";

const router = Router();


router.get("/tokens/price/:address",getTokenPrice)
router.get("/lp/price/:address",getQuickswapLpTokenPrice)


export default router;