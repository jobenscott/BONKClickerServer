import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import {
    solManualClick,
    solPurchaseAutoClicker,
    solPurchaseAutoClickerMultiplier,
    solPurchaseClickPower,
} from "../controllers/solClicker";

router.get("/solManualClick", solManualClick);
router.get("/solPurchaseAutoClicker", solPurchaseAutoClicker);
router.get("/solPurchaseAutoClickerMultiplier", solPurchaseAutoClickerMultiplier);
router.get("/solPurchaseClickPower", solPurchaseClickPower);
module.exports = router;
