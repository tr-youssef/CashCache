import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number, //or Decimal128?
    required: [true, "amount is required"],
  },
  tranDate: {
    type: Date,
    required: [true, "transaction date is required"],
  },
  note: {
    type: String,
    required: [false],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "User is required"],
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: [true, "Category is required"],
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accounts",
    required: [true, "Account is required"],
  },
  tags: [
    {
      type: String,
    },
  ],
});

const Transactions = mongoose.model("Transactions", transactionSchema);
const tranAgg = mongoose.Collection;

export default Transactions;
