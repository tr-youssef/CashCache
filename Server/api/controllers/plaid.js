import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import util from "util";
export const createLinkToken = async (req, res, next) => {
  const PLAID_CLIENT_ID = "6487e33a8e934f0012d5527d";
  const PLAID_SECRET = "d84ca74b28c756702577333026083f";
  const PLAID_ENV = "sandbox";
  const PLAID_PRODUCTS = ["auth", "transactions"];
  const PLAID_COUNTRY_CODES = ["US", "CA"];
  const PLAID_REDIRECT_URI = "";
  const PLAID_ANDROID_PACKAGE_NAME = "";

  const configuration = new Configuration({
    basePath: PlaidEnvironments[PLAID_ENV],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
        "PLAID-SECRET": PLAID_SECRET,
        "Plaid-Version": "2020-09-14",
      },
    },
  });
  const client = new PlaidApi(configuration);
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
        products: PLAID_PRODUCTS,
        country_codes: PLAID_COUNTRY_CODES,
        language: "en",
      };

      if (PLAID_REDIRECT_URI !== "") {
        configs.redirect_uri = PLAID_REDIRECT_URI;
      }

      if (PLAID_ANDROID_PACKAGE_NAME !== "") {
        configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
      }
      const createTokenResponse = await client.linkTokenCreate(configs);
      prettyPrintResponse(createTokenResponse);
      res.json(createTokenResponse.data);
    })
    .catch(next);
};
