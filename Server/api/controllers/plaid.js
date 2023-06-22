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
export const generateLinkToken = async (req, res) => {
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
};

// export const getPublicToken = async (req, res) => {
//   const publicToken = req.body.publicToken;
//   try {
//     const plaidResponse = await plaidClient.itemPublicTokenExchange({
//       public_token: publicToken,
//     });
//     const accessToken = plaidResponse.data.access_token;
//     res.json({ accessToken });
//   } catch (error) {
//     res.status(500).send("access token failed");
//   }
// };

export const exchangePublicToken = async (req, res) => {
  const publicToken = req.body.publicToken;
  try {
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    res.json({
      // the 'access_token' is a private token, DO NOT pass this token to the frontend in your production environment
      access_token: tokenResponse.data.access_token,
      item_id: tokenResponse.data.item_id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getTransactions = async (req, res) => {
  try {
    // Set cursor to empty to receive all historical updates
    let cursor = null;

    // New transaction updates since "cursor"
    let added = [];
    let modified = [];
    // Removed transaction ids
    let removed = [];
    let hasMore = true;
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const request = {
        access_token: ACCESS_TOKEN,
        cursor: cursor,
      };
      const response = await client.transactionsSync(request);
      const data = response.data;
      // Add this page of results
      added = added.concat(data.added);
      modified = modified.concat(data.modified);
      removed = removed.concat(data.removed);
      hasMore = data.has_more;
      // Update cursor to the next cursor
      cursor = data.next_cursor;
    }

    const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
    // Return the 8 most recent transactions
    const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
    response.json({ latest_transactions: recently_added });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
