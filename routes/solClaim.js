import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import {
    solClaim
} from "../controllers/solClaim";

router.get("/solClaim", solClaim);

module.exports = router;
