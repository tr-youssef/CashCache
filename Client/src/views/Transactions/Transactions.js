import { StyleSheet, Text, View, Platform } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { PlaidLink } from "react-native-plaid-link-sdk";

const Transactions = () => {
  const [linkToken, setLinkToken] = useState(null);
  const address = Platform.OS === "ios" ? "10.44.22.31" : "10.44.22.31";

  const createLinkToken = useCallback(async () => {
    await fetch(`http://localhost:4001/create_link_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: address }),
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
  console.log("linktoken :", linkToken);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.heading}>
        <Text style={styles.titleText}>Link your bank account</Text>
      </View>
      <View style={styles.bottom}>
        <PlaidLink
          tokenConfig={{
            token: linkToken,
            noLoadingState: false,
          }}
          onSuccess={async () => {
            await fetch(`http://localhost:4001/exchange_public_token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ public_token: success.publicToken }),
            }).catch((err) => {
              console.log(err);
            });
            navigation.navigate("Success", success);
          }}
          onExit={() => {
            console.log(response);
          }}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Open Link</Text>
          </View>
        </PlaidLink>
      </View>
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
