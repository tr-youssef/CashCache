import { StyleSheet } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Plaid from "../../utils/plaid/Plaid.js";
import { PlaidContext } from "../../utils/context/PlaidContext.js";
import { callAPI } from "../../utils/fetch/callAPI.js";

const TransactionsPlaid = ({ navigation }) => {
  const plaidContext = useContext(PlaidContext);
  const { linkToken, setAccessToken } = plaidContext;
  let plaidAccounts = [];
  const [nameAccounts, setNameAccounts] = useState([]);
  useEffect(() => {
    callAPI("/api/accounts", "GET", "", token)
      .then((accounts) => {
        let tempAccounts = [];
        accounts.map((account) => {
          if (account.plaidId) {
            tempAccounts.push(account.plaidId);
          }
        });
        plaidAccounts = tempAccounts;
      })
      .catch((error) => console.log("error", error));
  }, []);
  const handleSuccess = async (success) => {
    await createLinkToken(success.publicToken);
    navigation.navigate("Transactions");
  };

  const findAccountName = (data, accountId) => {
    const transaction = data.accounts.find((item) => item.account_id === accountId);
    return transaction ? transaction.name : null;
  };
  const createLinkToken = async (publicToken) => {
    await callAPI("/api/plaid/exchange_public_token", "POST", { publicToken: publicToken }, token)
      .then(async (res) => {
        setAccessToken(res.access_token);
        await callAPI("/api/plaid/getAccounts", "POST", { access_token: res.access_token }, token)
          .then(async (nameAccounts) => {
            setNameAccounts(nameAccounts);
            await callAPI("/api/plaid/synctransactions", "POST", { access_token: res.access_token }, token)
              .then((transactions) => {
                transactions.latest_transactions.map(async (transaction) => {
                  console.log(transaction.account_id, " include ", plaidAccounts, " is ", plaidAccounts.includes(transaction.account_id));
                  if (plaidAccounts.includes(transaction.account_id)) {
                    console.log("add transaction");
                    await callAPI(
                      "/api/transactions",
                      "POST",
                      { amount: transaction.amount, tranDate: transaction.date, categoryId: transaction.amount > 0 ? "64a6e7ede4a6c55040e9c7fc" : "64a6e81fe4a6c55040e9c7fe", accountId: transaction.account_id },
                      token
                    );
                  } else {
                    plaidAccounts.push(transaction.account_id);
                    await callAPI("/api/accounts", "POST", { name: findAccountName(nameAccounts, transaction.account_id), initialAmount: 0, plaidId: transaction.account_id }, token).then(async (res) => {
                      // setPlaidAccounts((prevAccounts) => [...prevAccounts, transaction.account_id]);
                      await callAPI("/api/transactions", "POST", { amount: transaction.amount, tranDate: transaction.date, categoryId: transaction.amount > 0 ? "64a6e7ede4a6c55040e9c7fc" : "64a6e81fe4a6c55040e9c7fe", accountId: res._id }, token);
                    });
                  }
                });
              })
              .catch((error) => console.log("error", error));
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  };

  return <Plaid linkToken={linkToken} onExit={(exit) => navigation.navigate("Transactions")} onSuccess={handleSuccess} />;
};

export default TransactionsPlaid;

const styles = StyleSheet.create({});
