import express from "express";
import { addParentCategory, deleteCategory, updateParentCategory, getParentsCategories } from "../controllers/categories.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/parents/", auth, getParentsCategories);
router.post("/parent", auth, addParentCategory);
router.patch("/parent/:id", auth, updateParentCategory);
router.delete("/:id", auth, deleteCategory);

export default router;
