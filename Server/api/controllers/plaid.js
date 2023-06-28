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

export const syncTransactions = async (req, res, next) => {
  Promise.resolve()
    .then(async function () {
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
          access_token: req.body.access_token,
          cursor: cursor,
        };
        const response = await plaidClient.transactionsSync(request);
        const data = response.data;
        // Add this page of results
        added = added.concat(data.added);
        modified = modified.concat(data.modified);
        removed = removed.concat(data.removed);
        hasMore = data.has_more;
        // Update cursor to the next cursor
        cursor = data.next_cursor;
        // prettyPrintResponse(response);
      }

      const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
      // Return the 8 most recent transactions
      const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
      console.log("recently_added", recently_added);
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
    // const total_transactions = response.data.total_transactions;
    // // Manipulate the offset parameter to paginate
    // // transactions and retrieve all available data
    // while (transactions.length < total_transactions) {
    //   const paginatedRequest = {
    //     access_token: accessToken,
    //     start_date: '2018-01-01',
    //     end_date: '2020-02-01',
    //     options: {
    //       offset: transactions.length,
    //       include_personal_finance_category: true
    //     },
    //   };
    //   const paginatedResponse = await plaidClient.transactionsGet(paginatedRequest);
    //   transactions = transactions.concat(
    //     paginatedResponse.data.transactions,
    //   );
    // }
    res.json({ transactions: transactions });
  } catch (error) {
    console.log("error.message", error.message);
    res.status(500).send(error.message);
  }
};
