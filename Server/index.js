import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import test from "./api/test.js";
import routeCategories from "./api/routes/categories.js";
import routeUsers from "./api/routes/users.js";

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());
dotenv.config();

app.use("/api/test", test);
app.use("/api/users", routeUsers);
app.use("/api/categories", routeCategories);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error));
