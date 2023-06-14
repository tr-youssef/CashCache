import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import test from "./api/test.js";
import routeCategories from "./api/routes/categories.js";
import routeUsers from "./api/routes/users.js";
import tokens from "./api/routes/tokens.js";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import util from "util";

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());
dotenv.config();

app.use("/api/test", test);
app.use("/api/users", routeUsers);
app.use("/api/categories", routeCategories);
app.use("/api/tokens", tokens);

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

export const createLinkToken = async (req, res, next) => {
  const configuration = new Configuration({
    basePath: PlaidEnvironments[PLAID_ENV],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
        "PLAID-SECRET": process.env.PLAID_SECRET,
        "Plaid-Version": "2020-09-14",
      },
    },
  });
  const plaidClient = new PlaidApi(configuration);
  const prettyPrintResponse = (response) => {
    console.log(util.inspect(response.data, { colors: true, depth: 4 }));
  };
  Promise.resolve()
    .then(async function () {
      const configs = {
        user: {
          // This should correspond to a unique id for the current user.
          client_user_id: "user-id",
        },
        client_name: "Plaid Quickstart",
        products: process.env.PLAID_PRODUCTS,
        country_codes: process.envPLAID_COUNTRY_CODES,
        language: "en",
      };

      if (process.env.PLAID_REDIRECT_URI !== "") {
        configs.redirect_uri = process.env.PLAID_REDIRECT_URI;
      }

      if (process.env.PLAID_ANDROID_PACKAGE_NAME !== "") {
        configs.android_package_name = process.env.PLAID_ANDROID_PACKAGE_NAME;
      }
      const createTokenResponse = await plaidClient.linkTokenCreate(configs);
      prettyPrintResponse(createTokenResponse);
      res.json(createTokenResponse.data);
    })
    .catch(next);
};
