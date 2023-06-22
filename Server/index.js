import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import test from "./api/test.js";
import routeCategories from "./api/routes/categories.js";
import routeUsers from "./api/routes/users.js";
import routeAccounts from "./api/routes/accounts.js";

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());
dotenv.config();

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

app.use("/api/test", test);
app.use("/api/users", routeUsers);
app.use("/api/categories", routeCategories);
app.use("/api/accounts", routeAccounts);

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

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.CHAT_API_KEY,
  })
);
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();
userInterface.on("line", async (input) => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });
  console.log(res.data.choices[0].message.content);
});
