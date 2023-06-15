import express from "express";
import { getAccounts, getAccountById, addAccount, updateAccount, deleteAccount } from "../controllers/accounts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAccounts);
router.get("/:id", auth, getAccountById);
router.post("/", auth, addAccount);
router.patch("/:id", auth, updateAccount);
router.delete("/:id", auth, deleteAccount);

export default router;
