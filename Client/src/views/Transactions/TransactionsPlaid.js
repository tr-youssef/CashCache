import { StyleSheet } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Plaid from "../../utils/plaid/Plaid.js";
import { PlaidContext } from "../../utils/context/PlaidContext.js";
import { callAPI } from "../../utils/fetch/callAPI.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransactionsPlaid = ({ navigation }) => {
  const plaidContext = useContext(PlaidContext);
  const { linkToken, setAccessToken } = plaidContext;
  const [plaidAccounts, setPlaidAccounts] = useState([]);

  useEffect(() => {
    fetchPlaidAccounts();
  }, []);

  const fetchPlaidAccounts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const accounts = await callAPI("/api/accounts", "GET", "", token);
      const tempAccounts = accounts.filter((account) => account.plaidId).map((account) => account.plaidId);
      setPlaidAccounts(tempAccounts);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSuccess = async (success) => {
    try {
      const { publicToken } = success;
      const { access_token } = await exchangePublicToken(publicToken);
      setAccessToken(access_token);
      const plaidNameAccounts = await getPlaidAccounts(access_token);
      await syncTransactions(access_token, plaidNameAccounts);
      navigation.navigate("Transactions");
    } catch (error) {
      console.log("error", error);
    }
  };

  const exchangePublicToken = async (publicToken) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await callAPI("/api/plaid/exchange_public_token", "POST", { publicToken }, token);
      return res;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getPlaidAccounts = async (accessToken) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const nameAccounts = await callAPI("/api/plaid/getAccounts", "POST", { access_token: accessToken }, token);
      return nameAccounts;
    } catch (error) {
      throw new Error(error);
    }
  };

  const syncTransactions = async (accessToken, plaidNameAccounts) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const transactions = await callAPI("/api/plaid/synctransactions", "POST", { access_token: accessToken }, token);
      for (const transaction of transactions.latest_transactions) {
        const existingAccount = await findAccountByPlaidId(transaction.account_id);
        if (existingAccount) {
          await createTransaction(transaction, existingAccount);
        } else {
          await createAccountAndTransaction(transaction, plaidNameAccounts);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const createTransaction = async (transaction, existingAccount) => {
    try {
      const { account_id, amount, date } = transaction;
      const categoryId = transaction.amount > 0 ? "64a6e7ede4a6c55040e9c7fc" : "64a6e81fe4a6c55040e9c7fe";
      const token = await AsyncStorage.getItem("token");
      await callAPI(
        "/api/transactions",
        "POST",
        { amount, tranDate: date, categoryId, accountId: existingAccount._id },
        token
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  const createAccountAndTransaction = async (transaction, plaidNameAccounts) => {
    try {
      const { account_id, amount, date } = transaction;
      const name = findAccountName(plaidNameAccounts, account_id);
      const balance = 0;
      const plaidId = account_id;
      const token = await AsyncStorage.getItem("token");
      const res = await callAPI("/api/accounts", "POST", { name, balance, plaidId }, token);
      await createTransaction({ amount, date }, { _id: res._id });
      setPlaidAccounts((prevAccounts) => [...prevAccounts, account_id]);
    } catch (error) {
      throw new Error(error);
    }
  };

  const findAccountByPlaidId = async (plaidId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const account = await callAPI(`/api/accounts/plaid/${plaidId}`, "GET", "", token);
      return account;
    } catch (error) {
      throw new Error(error);
    }
  };

  const findAccountName = (data, accountId) => {
    const transaction = data.accounts.find((item) => item.account_id === accountId);
    return transaction ? transaction.name : null;
  };

  return (
    <Plaid linkToken={linkToken} onExit={(exit) => navigation.navigate("Transactions")} onSuccess={handleSuccess} />
  );
};

export default TransactionsPlaid;

const styles = StyleSheet.create({});
