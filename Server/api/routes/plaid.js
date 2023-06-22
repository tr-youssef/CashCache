import express from "express";
import { generateLinkToken, exchangePublicToken, getTransactions } from "../controllers/plaid.js";

const router = express.Router();

router.post("/generate_link_token", generateLinkToken);
// router.post("/get_public_token", getPublicToken);
router.post("/exchange_public_token", exchangePublicToken);
router.get("/transaction", getTransactions);

export default router;
