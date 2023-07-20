import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import test from "./api/test.js";
import routeCategories from "./api/routes/categories.js";
import routeUsers from "./api/routes/users.js";
import routeAccounts from "./api/routes/accounts.js";
import routeChat from "./api/routes/chatGPT.js";
import routePlaid from "./api/routes/plaid.js";
import routeTransactions from "./api/routes/transactions.js";

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());
dotenv.config();

app.use("/api/test", test);
app.use("/api/users", routeUsers);
app.use("/api/categories", routeCategories);
app.use("/api/accounts", routeAccounts);
app.use("/api/chat", routeChat);
app.use("/api/plaid", routePlaid);
app.use("/api/transactions", routeTransactions);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
  .catch((error) => console.log(error));
