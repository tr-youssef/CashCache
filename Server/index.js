import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import test from "./api/test.js";

const app = express();
dotenv.config();

app.use(express.json({ extended: false }));
app.use("/api/test", test);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
  .catch((error) => console.log(error));
