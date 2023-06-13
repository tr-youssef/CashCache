import express from "express";
import { createLinkToken } from "../controllers/plaid.js";

const router = express.Router();

router.post("/", createLinkToken);

export default router;
