import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  balance: {
    type: Number,
    required: [true, "Amount is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
  plaidId: {
    type: String,
  },
  type: {
    type: String,
    required: [true, "Account type is required"],
  },
  accountNumber: {
    type: Number,
    required: [true, "Account number is required"],
  },
});

const Accounts = mongoose.model("Accounts", accountSchema);

export default Accounts;
