import express from "express";
import { generateLinkToken, getPublicToken } from "../controllers/plaid.js";

const router = express.Router();

router.post("/generate_link_token", generateLinkToken);

router.post("/exchange_public_token", getPublicToken);

export default router;
