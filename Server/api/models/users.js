import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: [true, "lastName is required"],
  },
  firstName: {
    type: String,
    required: [true, "firstName is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email is already use"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

const Users = mongoose.model("Users", userSchema);

export default Users;
