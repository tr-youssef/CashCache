import jwt from "jsonwebtoken";
import Categories from "../models/categories.js";

export const getParentsCategories = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }
  try {
    const categories = await Categories.find({
      userId: req.userId,
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addParentCategory = async (req, res) => {
  const newCategory = req.body;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }
  try {
    let categoryCreated = await Categories.create({
      name: newCategory.name,
      type: newCategory.type,
      icon: newCategory.icon,
      userId: req.userId,
    });
    res.status(201).json(categoryCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateParentCategory = async (req, res) => {
  const { id } = req.params;
  const newCategory = req.body;
  try {
    const oldCategory = await Categories.updateOne(
      {
        _id: id,
      },
      {
        name: newCategory.name,
        type: newCategory.type,
        icon: newCategory.icon,
        subcategories: newCategory.subcategories,
      }
    );
    if (oldCategory.modifiedCount > 0) {
      const categoryUpdated = await Categories.findOne({
        _id: id,
      });
      res.status(201).json(categoryUpdated);
    } else {
      res.status(404).json({ message: `No Category with id : ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let decodedData = jwt.verify(token, process.env.HASHCODE);
    req.userId = decodedData?.id;
  }
  try {
    const categoryDeleted = await Categories.deleteOne({
      _id: id,
      userId: req.userId,
    });
    categoryDeleted.deletedCount > 0 ? res.status(200).json("Category deleted") : res.status(400).json("Category doesn't exist");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
