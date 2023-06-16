import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import PlaidLink from "@burstware/expo-plaid-link";

const Transactions = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [token, setToken] = useState(null);

  const createLinkToken = useCallback(async () => {
    await fetch(`http://10.44.22.68:4001/api/plaid/generate_link_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLinkToken(data.link_token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setLinkToken]);

  useEffect(() => {
    if (linkToken == null) {
      createLinkToken();
    }
  }, [linkToken]);
  return (
    <View style={{ flex: 1 }}>
      <PlaidLink
        linkToken={linkToken}
        onSuccess={async (success) =>
          await fetch("http://10.44.22.68:4001/api/plaid/exchange_public_token", {
            method: "POST",
            body: {
              publicToken: success.publicToken,
              accounts: success.metadata.accounts,
              institution: success.metadata.institution,
              linkSessionId: success.metadata.linkSessionId,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("data", data);
              setToken(data.link_token);
            })
            .catch((err) => {
              console.log("err", err);
            })
        }
      />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#F2FFF5",
  },
});
