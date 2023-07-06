import express from "express";
import { generateLinkToken, exchangePublicToken, getTransactions, syncTransactions, getAccounts } from "../controllers/plaid.js";

const router = express.Router();

router.post("/generate_link_token", generateLinkToken);
router.post("/exchange_public_token", exchangePublicToken);
router.post("/gettransactions", getTransactions);
router.post("/synctransactions", syncTransactions);
router.post("/getAccounts", getAccounts);

export default router;
