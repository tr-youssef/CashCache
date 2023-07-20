import { Configuration, OpenAIApi } from "openai";

import dotenv from "dotenv";
dotenv.config();

export const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.CHAT_API_KEY,
  })
);
