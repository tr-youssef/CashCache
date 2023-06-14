import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/generate_link_token", async (req, res, next) => {
  try {
    //const userId = getLoggedInUserId(req);
    const configuration = new Configuration({
      basePath: PlaidEnvironments[process.env.PLAID_ENV],
      baseOptions: {
        headers: {
          "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
          "PLAID-SECRET": process.env.PLAID_SECRET,
          "Plaid-Version": "2020-09-14",
        },
      },
    });
    const plaidClient = new PlaidApi(configuration);
    const userObject = { client_user_id: "1234" };
    const tokenResponse = await plaidClient.linkTokenCreate({
      user: userObject,
      products: ["transactions"],
      client_name: "Where'd My Money Go?",
      language: "en",
      country_codes: ["US"],
      //   webhook: WEBHOOK_URL,
    });
    res.json(tokenResponse.data);
  } catch (error) {
    console.log(`Running into an error!`);
    next(error);
  }
});

export default router;
