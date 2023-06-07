import express from "express";
import { addParentCategory, addChildCategory, getParentsCategories, getChildsCategories, deleteCategory, updateParentCategory, updateChildCategory, getCategoryById } from "../controllers/categories.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/parents/", auth, getParentsCategories);
router.post("/parent", auth, addParentCategory);
// router.get("/childs/", auth, getChildsCategories);
// router.get("/:id", auth, getCategoryById);
// router.post("/child", auth, addChildCategory);
// router.delete("/:id", auth, deleteCategory);
// router.patch("/parent/:id", auth, updateParentCategory);
// router.patch("/child/:id", auth, updateChildCategory);

export default router;
