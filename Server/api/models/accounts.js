import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  balance: {
    type: Number,

    default: 0,
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
    default: "debit",
    // required: [true, "Account type is required"],
  },
  accountNumber: {
    type: Number,

    default: 1111111111111111,
    // required: [true, "Account number is required"],
  },
});

const Accounts = mongoose.model("Accounts", accountSchema);

export default Accounts;
