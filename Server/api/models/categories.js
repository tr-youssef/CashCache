import mongoose from "mongoose";

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
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  ],
});

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
