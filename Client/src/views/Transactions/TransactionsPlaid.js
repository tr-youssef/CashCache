import { StyleSheet } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Plaid from "../../utils/plaid/Plaid.js";
import { PlaidContext } from "../../utils/context/PlaidContext.js";
import { callAPI } from "../../utils/fetch/callAPI.js";

const TransactionsPlaid = ({ navigation }) => {
  const plaidContext = useContext(PlaidContext);
  const { linkToken, setAccessToken } = plaidContext;
  const [transactions, setTransactions] = useState([]);
  const [plaidAccounts, setPlaidAccounts] = useState([]);
  useEffect(() => {
    callAPI("/api/accounts", "GET", "", token)
      .then((accounts) => {
        let tempAccounts = [];
        accounts.map((account) => {
          if (account.plaidId) {
            tempAccounts.push(account.plaidId);
          }
        });
        setPlaidAccounts(tempAccounts);
      })
      .catch((error) => console.log("error", error));
  }, []);
  const handleSuccess = async (success) => {
    await createLinkToken(success.publicToken);
    navigation.navigate("Transactions");
  };
  //je dois chercher les accounts que j'ai, et chercher les accounts dans transactionPlaid, matcher entre eux, et ceux qui existent pas je dois les créer
  //si je veux le faire pour chaque transaction, je dois chercher l'accountId dans la transaction si il existe dans mes accounts.plaidId, si c'est le cas j'ajoute la transaction, si c'est pas le cas je le crée et j'ajoute la transaction
  const createLinkToken = async (publicToken) => {
    await callAPI("/api/plaid/exchange_public_token", "POST", { publicToken: publicToken }, token)
      .then(async (res) => {
        setAccessToken(res.access_token);
        await callAPI("/api/plaid/synctransactions", "POST", { access_token: res.access_token }, token)
          .then((transactions) => {
            transactions.latest_transactions.map(async (transaction) => {
              console.log(transaction.account_id, " is ", plaidAccounts.includes(transaction.account_id));
              if (plaidAccounts.includes(transaction.account_Id)) {
                await callAPI(
                  "/api/transactions",
                  "POST",
                  { amount: transaction.amount, tranDate: transaction.date, categoryId: transaction.amount > 0 ? "64a6e7ede4a6c55040e9c7fc" : "64a6e81fe4a6c55040e9c7fe", accountId: transaction.account_id },
                  token
                );
              } else {
                await callAPI("/api/accounts", "POST", { name: "test", initialAmount: 0, plaidId: transaction.account_id }, token).then(async (res) => {
                  await callAPI("/api/transactions", "POST", { amount: transaction.amount, tranDate: transaction.date, categoryId: transaction.amount > 0 ? "64a6e7ede4a6c55040e9c7fc" : "64a6e81fe4a6c55040e9c7fe", accountId: res._id }, token);
                });
              }
            });
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  };

  return <Plaid linkToken={linkToken} onExit={(exit) => navigation.navigate("Transactions")} onSuccess={handleSuccess} />;
};

export default TransactionsPlaid;

const styles = StyleSheet.create({});
