import { Configuration, OpenAIApi } from "openai";
// import readline from "readline";
import dotenv from "dotenv";
dotenv.config();

export const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.CHAT_API_KEY,
  })
);

// leave below in for now
// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// userInterface.prompt();
// userInterface.on("line", async (input) => {
//   //   const res = await openai.createChatCompletion({
//   //     model: "gpt-3.5-turbo",
//   //     messages: [{ role: "user", content: input }],
//   //   });
//   //   console.log(res.data.choices[0].message.content);
//   const res = await openai.createCompletion({
//     // model: "davinci:ft-personal-2023-06-26-23-43-26",
//     model: "text-davinci-003",
//     prompt: input,
//     max_tokens: 1000,
//   });
//   console.log(res.data.choices[0].text);
// });
