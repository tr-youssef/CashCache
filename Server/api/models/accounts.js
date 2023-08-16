import mongoose from "mongoose";

function generateRandomCreditCardNumber() {
  let randomNumber = "";
  for (let i = 0; i < 16; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
}

function generateRandomAccountType() {
  return Math.random() < 0.5 ? "debit" : "credit";
}

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
    default: generateRandomAccountType,
    // required: [true, "Account type is required"],
  },
  accountNumber: {
    type: Number,
    default: generateRandomCreditCardNumber, // Use the function to generate the default value

    // required: [true, "Account number is required"],
  },
});

const Accounts = mongoose.model("Accounts", accountSchema);

export default Accounts;
