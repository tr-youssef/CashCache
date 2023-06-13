import express from "express";
import { addParentCategory, deleteCategory, updateParentCategory, getParentsCategories } from "../controllers/categories.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/parents/", auth, getParentsCategories);
router.post("/parent", auth, addParentCategory);
router.patch("/parent/:id", auth, updateParentCategory);
router.delete("/:id", auth, deleteCategory);
//router.get("/parents/:id", auth, getCategoryById);
//router.get("/childs/", auth, getChildsCategories);
// router.post("/child", auth, addChildCategory);
// router.patch("/parent/:id", auth, updateParentCategory);
// router.patch("/child/:id", auth, updateChildCategory);

export default router;
