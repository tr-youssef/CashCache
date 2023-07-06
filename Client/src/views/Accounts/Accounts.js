import React, { useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, FlatList, View, Pressable } from "react-native";
import AddButton from "../../components/AddButton/AddButton.js";
import { AccountsContext } from "../../utils/context/AccountsContext.js";
import { callAPI } from "../../utils/fetch/callAPI.js";
import Card from "../../components/Card/Card.js";

const Accounts = ({ navigation }) => {
  const isFocused = useIsFocused();
  const AccountContext = useContext(AccountsContext);
  const { accounts, setAccounts } = AccountContext;

  const handlerPress = (item) => {
    navigation.navigate("EditAccount", { item });
  };

  useEffect(() => {
    callAPI("/api/accounts", "GET", "", token)
      .then((res) => setAccounts(res))
      .catch((error) => console.log("error", error));
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <FlatList
        data={accounts}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.containerCard}
            onPress={() => {
              handlerPress(item);
            }}
          >
            <Card name={item.name} initialAmount={item.initialAmount} />
          </Pressable>
        )}
        keyExtractor={(item) => item._id}
      />
      <AddButton screen={"AddAccount"} />
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    alignItems: "center",
    justifyContent: "center",
  },
  containerCard: {
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: "#F2FFF5",
  },
});
