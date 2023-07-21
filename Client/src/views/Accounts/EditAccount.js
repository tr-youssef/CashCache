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
import DropDownPicker from "react-native-dropdown-picker";

const EditAccount = ({ route, navigation }) => {
  const { item } = route.params;
  const AccountContext = useContext(AccountsContext);
  const { setAccounts } = AccountContext;
  const [name, setName] = useState(item.name);
  const [accountNumber, setAccountNumber] = useState(item.accountNumber);
  const [balance, setBalance] = useState(item.balance);

  //dropdown state
  const data = [
    { label: "Credit", value: "credit" },
    { label: "Debit", value: "debit" },
  ];
  const [type, setType] = useState(item.type);

  const saveAccount = async (name, accountNumber, type, balance) => {
    const token = await AsyncStorage.getItem("token");
    await callAPI(
      `/api/accounts/${item._id}`,
      "PATCH",
      { name: name, accountNumber: accountNumber, type: type, balance: balance },
      token
    )
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
      title: "Edit Account",
      headerRight: () => (
        <Icon
          name="save"
          type="MaterialIcons"
          color={"#33CD48"}
          onPress={() => saveAccount(name, accountNumber, type, balance)}
        />
      ),
    });
  }, [navigation, name, accountNumber, type, balance]);

  return (
    <View style={styles.container}>
      <Input label={"Name :"} value={name} setValue={setName} />
      <Input
        label={"Account Number :"}
        value={accountNumber.toString()}
        setValue={setAccountNumber}
        keyboardType="decimal-pad"
      />
      <Input label={"Type :"} datalist={data} value={type} setValue={setType} />
      <Input label={"Balance :"} value={balance.toString()} setValue={setBalance} keyboardType="decimal-pad" />
      <Card name={name} accountNumber={accountNumber} type={type} balance={balance} />
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
