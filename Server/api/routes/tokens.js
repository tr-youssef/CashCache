import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import dotenv from "dotenv";
dotenv.config();

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

const router = express.Router();

router.post("/generate_link_token", async function (req, res) {
  const plaidRequest = {
    user: {
      client_user_id: "user",
    },
    client_name: "Plaid Test App",
    products: ["transactions"],
    language: "en",
    country_codes: ["US", "CA"],
  };
  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
    res.json(createTokenResponse.data);
  } catch (error) {
    res.status(500).send("failed to create token");
  }
});

router.post("/exchange_public_token", async function (req, res) {
  const publicToken = req.body.public_token;
  try {
    const plaidResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = plaidResponse.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    res.status(500).send("access token failed");
  }
});

export default router;
