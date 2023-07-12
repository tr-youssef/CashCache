import express, { response } from "express";
import { openai } from "../controllers/chatgpt.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.2,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.6,
      presence_penalty: 0,
    });

    console.log("response :", response);
    // console.log(res.data.choices[0].text);
    res.status(200).send({
      bot: response.data.choices[0].text.trim(),
    });
  } catch (error) {
    //console.log("errorrrr :", error);
    res.status(500).send({ error });
  }
});

export default router;
