import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Icon } from "@rneui/themed";
import Input from "../../components/Input/Input.js";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { useState } from "react";
import { AccountsContext } from "../../utils/context/AccountsContext.js";
import Card from "../../components/Card/Card.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddAccount = ({ navigation }) => {
  const AccountContext = useContext(AccountsContext);
  const { setAccounts } = AccountContext;
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState(0);

  //dropdown state
  const data = [
    { label: "Credit", value: "credit" },
    { label: "Debit", value: "debit" },
  ];
  const [type, setType] = useState(data.length > 0 ? data[0].value : "");

  const saveAccount = async (name, accountNumber, type, balance) => {
    const token = await AsyncStorage.getItem("token");
    await callAPI(
      "/api/accounts/",
      "POST",
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Account",
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
      <Input label={"Account Number:"} value={accountNumber.toString()} setValue={setAccountNumber} />
      <Input label={"Type :"} datalist={data} value={type} setValue={setType} />
      <Input
        label={"Initial balance :"}
        value={balance.toString()}
        setValue={setBalance}
        keyboardType={"decimal-pad"}
      />
      <Card name={name} accountNumber={accountNumber} type={type} balance={balance} />
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
