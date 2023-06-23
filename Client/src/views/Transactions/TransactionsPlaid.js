import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import Plaid from "../../utils/plaid/Plaid.js";
import { PlaidContext } from "../../utils/context/PlaidContext.js";
import { callAPI } from "../../utils/fetch/callAPI.js";

const TransactionsPlaid = ({ navigation }) => {
  const plaidContext = useContext(PlaidContext);
  const { linkToken, setAccessToken, access_token } = plaidContext;

  const createLinkToken = async (publicToken) => {
    callAPI("/api/plaid/exchange_public_token", "POST", { publicToken: publicToken }, token)
      .then((res) => {
        setAccessToken(res.access_token);
        getTransaction(res.access_token);
      })
      .catch((error) => console.log("error", error));
  };

  const getTransaction = async (access_token) => {
    callAPI("/api/plaid/synctransactions", "POST", { access_token: access_token }, token)
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Plaid
      linkToken={linkToken}
      onExit={(exit) => navigation.navigate("Transactions")}
      onSuccess={async (success) => {
        await createLinkToken(success.publicToken);
        navigation.navigate("Transactions");
      }}
    />
  );
};

export default TransactionsPlaid;

const styles = StyleSheet.create({});
