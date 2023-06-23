import express from "express";
import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactions,
} from "../controllers/transactions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getTransactions);
router.post("/", auth, addTransaction);
router.patch("/:id", auth, updateTransaction);
router.delete("/:id", auth, deleteTransaction);

export default router;
