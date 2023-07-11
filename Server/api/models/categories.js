import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    allowNull: false,
    required: [true, "Name is required"],
  },
  icon: {
    type: String,
    allowNull: false,
    required: [true, "Icon is required"],
  },
});

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    allowNull: false,
    required: [true, "Name is required"],
  },
  type: {
    type: String,
    allowNull: false,
    required: [true, "Type is required"],
  },
  icon: {
    type: String,
    allowNull: false,
    required: [true, "Icon is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  plaidId: {
    type: String,
  },
  subcategories: [subcategorySchema],
});

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
