import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import {
    manualClick,
    purchaseAutoClicker,
    purchaseAutoClickerMultiplier,
    purchaseClickPower,
} from "../controllers/clicker";

router.get("/manualClick", manualClick);
router.get("/purchaseAutoClicker", purchaseAutoClicker);
router.get("/purchaseAutoClickerMultiplier", purchaseAutoClickerMultiplier);
router.get("/purchaseClickPower", purchaseClickPower);
module.exports = router;
