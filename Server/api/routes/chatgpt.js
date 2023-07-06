import express from "express";
import { openai } from "../controllers/chatgpt.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(openai);
});

export default router;
