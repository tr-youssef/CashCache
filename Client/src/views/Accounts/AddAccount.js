import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Icon } from "@rneui/themed";
import Input from "../../components/Input/Input.js";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { useState } from "react";
import { AccountsContext } from "../../utils/context/AccountsContext.js";
import Card from "../../components/Card/Card.js";

const AddAccount = ({ navigation }) => {
  const AccountContext = useContext(AccountsContext);
  const { setAccounts } = AccountContext;
  const [name, setName] = useState("");
  const [initialAmount, setInitialAmount] = useState(0);

  const saveAccount = (name, initialAmount) => {
    callAPI("/api/accounts/", "POST", { name: name, initialAmount: initialAmount })
      .then(async () => {
        await callAPI("/api/accounts", "GET", "").then((res) => setAccounts(res));
        navigation.navigate("Accounts");
      })
      .catch((error) => {
        console.error("Error saving category:", error);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Account",
      headerRight: () => <Icon name="save" type="MaterialIcons" color={"#33CD48"} onPress={() => saveAccount(name, initialAmount)} />,
    });
  }, [navigation, name, initialAmount]);

  return (
    <View style={styles.container}>
      <Input label={"Name :"} value={name} setValue={setName} />
      <Input label={"Initial amount :"} value={initialAmount.toString()} setValue={setInitialAmount} />
      <Card name={name} initialAmount={initialAmount} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    alignItems: "center",
  },
});

export default AddAccount;
