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

export const exchangePublicToken = async (req, res) => {
  const publicToken = req.body.publicToken;
  try {
    const tokenResponse = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    res.json({
      access_token: tokenResponse.data.access_token,
      item_id: tokenResponse.data.item_id,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const syncTransactions = async (req, res, next) => {
  Promise.resolve()
    .then(async function () {
      let cursor = null;
      let added = [];
      let modified = [];
      let removed = [];
      let hasMore = true;
      while (hasMore) {
        const request = {
          access_token: req.body.access_token,
          cursor: cursor,
        };
        const response = await plaidClient.transactionsSync(request);
        const data = response.data;
        added = added.concat(data.added);
        modified = modified.concat(data.modified);
        removed = removed.concat(data.removed);
        hasMore = data.has_more;
        cursor = data.next_cursor;
      }

      const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
      const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
      res.json({ latest_transactions: recently_added });
    })
    .catch(next);
};

export const getTransactions = async (req, res) => {
  const request = {
    access_token: req.body.access_token,
    start_date: "2014-01-01",
    end_date: "2023-06-01",
    options: {
      include_personal_finance_category: true,
    },
  };
  try {
    const response = await plaidClient.transactionsGet(request);
    let transactions = response.data.transactions;
    res.json({ transactions: transactions });
  } catch (error) {
    console.log("error.message", error.message);
    res.status(500).send(error.message);
  }
};

export const getAccounts = async (req, res) => {
  const access_token = req.body.access_token;
  try {
    const authResponse = await plaidClient.accountsGet({
      access_token: access_token,
    });
    res.json(authResponse.data);
  } catch (error) {
    console.log("error.message", error.message);
    res.status(500).send(error.message);
  }
};
