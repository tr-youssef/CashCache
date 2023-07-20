import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Icon } from "@rneui/themed";
import Input from "../../components/Input/Input.js";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { useState } from "react";
import Card from "../../components/Card/Card.js";
import { AccountsContext } from "../../utils/context/AccountsContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteButton from "../../components/DeleteButton/DeleteButton.js";

const EditAccount = ({ route, navigation }) => {
  const { item } = route.params;
  const AccountContext = useContext(AccountsContext);
  const { setAccounts } = AccountContext;
  const [name, setName] = useState(item.name);
  const [balance, setbalance] = useState(item.balance);

  const saveAccount = async (name, balance) => {
    const token = await AsyncStorage.getItem("token");
    await callAPI(`/api/accounts/${item._id}`, "PATCH", { name: name, balance: balance }, token)
      .then(async () => {
        await callAPI("/api/accounts", "GET", "", token).then((res) => setAccounts(res));
        navigation.navigate("Accounts");
      })
      .catch((error) => {
        console.error("Error saving category:", error);
      });
  };

  const deleteAccount = async (idAccount) => {
    const token = await AsyncStorage.getItem("token");
    await callAPI(`/api/accounts/${item._id}`, "DELETE", { id: idAccount }, token)
      .then(async () => {
        await callAPI("/api/accounts", "GET", "", token).then((res) => setAccounts(res));
        navigation.navigate("Accounts");
      })
      .catch((error) => {
        console.error("Error saving category:", error);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Account",
      headerRight: () => (
        <Icon name="save" type="MaterialIcons" color={"#33CD48"} onPress={() => saveAccount(name, balance)} />
      ),
    });
  }, [navigation, name, balance]);

  return (
    <View style={styles.container}>
      <Input label={"Name :"} value={name} setValue={setName} />
      <Input label={"Balance :"} value={balance.toString()} setValue={setbalance} keyboardType="decimal-pad" />
      <Card name={name} balance={balance} />
      <DeleteButton
        screen={"AddAccount"}
        action={() => {
          deleteAccount(item._id);
        }}
      />
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

export default EditAccount;
