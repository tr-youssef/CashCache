import express from "express";
import { getAccounts, getAccountById, addAccount, updateAccount, deleteAccount, getAccountByPlaidId } from "../controllers/accounts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAccounts);
router.get("/:id", auth, getAccountById);
router.get("/plaid/:id", auth, getAccountByPlaidId);
router.post("/", auth, addAccount);
router.patch("/:id", auth, updateAccount);
router.delete("/:id", auth, deleteAccount);

export default router;
