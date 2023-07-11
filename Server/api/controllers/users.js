import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/users.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({
      email: email,
    });

    if (!existingUser) return res.status(500).json({ message: "User doesn't exist." });

    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (!result) return res.status(404).json({ message: "Password doesn't match." });
      else {
        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, process.env.HASHCODE, { expiresIn: "12h" });
        res.status(200).json({
          user: {
            email,
            lastName: existingUser.lastName,
            firstName: existingUser.firstName,
            id: existingUser.id,
          },
          token,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const existingUser = await Users.findOne({
      email: email,
    });

    if (existingUser) return res.status(400).json({ message: "User already exists." });

    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const user = await Users.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hash,
        });
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.HASHCODE, {
          expiresIn: "24h",
        });
        res.status(200).json({ user, token });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
