import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  initialAmount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
});

const Accounts = mongoose.model("Accounts", accountSchema);

export default Accounts;
