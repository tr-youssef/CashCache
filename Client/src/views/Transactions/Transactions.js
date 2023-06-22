import React, { useContext, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PlaidContext } from "../../utils/context/PlaidContext.js";
import { Icon } from "@rneui/themed";
import { callAPI } from "../../utils/fetch/callAPI.js";

const Transactions = ({ navigation }) => {
  const plaidContext = useContext(PlaidContext);
  const { linkToken, setLinkToken, accessToken } = plaidContext;
  console.log("accessToken", accessToken);

  const createLinkToken = useCallback(async () => {
    callAPI("/api/plaid/generate_link_token", "POST", {}, token)
      .then((res) => setLinkToken(res.link_token))
      .catch((error) => console.log("error", error));
  }, [setLinkToken]);

  useEffect(() => {
    if (linkToken == null) {
      createLinkToken();
    }
  }, [linkToken]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Transactions",
      headerLeft: () => (
        <Icon
          name="filter-alt"
          type="MaterialIcons"
          color={"#33CD48"}
          onPress={() => {
            navigation.navigate("Plaid");
          }}
        />
      ),
    });
  }, [navigation, linkToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Transactions</Text>
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
