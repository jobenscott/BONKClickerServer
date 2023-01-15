import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

// controllers
import {
    claim
} from "../controllers/claim";

router.get("/claim", claim);

module.exports = router;
