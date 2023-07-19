import express from "express";
import {
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactions,
  addTransactions,
  ExpensesByCategoryForDateRange,
  ExpenseTrendForDateRange,
} from "../controllers/transactions.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getTransactions);
router.post("/", auth, addTransaction);
router.post("/bulk", auth, addTransactions);
router.patch("/:id", auth, updateTransaction);
router.delete("/:id", auth, deleteTransaction);
router.get("/agg/expenses_by_category", auth, ExpensesByCategoryForDateRange);
router.get("/agg/expense_trend", auth, ExpenseTrendForDateRange);

export default router;
