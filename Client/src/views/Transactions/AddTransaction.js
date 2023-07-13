import { StyleSheet, View } from "react-native";
import Input from "../../components/Input/Input.js";
import Switch from "../../components/Switch/Switch.js";
import { Icon } from "@rneui/themed";
import React, { useState, useEffect, useContext } from "react";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { TransactionsContext } from "../../utils/context/TransactionsContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddTransaction = ({ navigation }) => {
  const { setTransactions } = useContext(TransactionsContext);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState("");
  const [categories, setCategories] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      await callAPI("/api/accounts", "GET", "", token)
        .then((res) => {
          const transformedData = res.map((res) => ({
            label: res.name,
            value: res._id,
          }));
          setAccounts(transformedData);
          setAccount(transformedData[0].value);
        })
        .catch((error) => console.log("error", error));
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      await callAPI("/api/categories/parents", "GET", "", token)
        .then((res) => {
          const transformedData = res.map((res) => ({
            label: res.name,
            value: res._id,
            type: res.type,
          }));
          setCategories(
            transformedData.filter((category) => category.type === type)
          );
          setCategory(
            transformedData.filter((category) => category.type === type)[0]
              .value
          );
        })
        .catch((error) => console.log("error", error));
    };
    fetchData();
  }, [type]);

  const saveTransaction = async (amount, account, category, date, note) => {
    const token = await AsyncStorage.getItem("token");
    await callAPI(
      "/api/transactions",
      "POST",
      {
        amount: amount,
        accountId: account,
        categoryId: category,
        tranDate: date,
        note: note,
      },
      token
    )
      .then(async () => {
        await callAPI("/api/transactions", "GET", "", token).then((res) =>
          setTransactions(res)
        );
        navigation.navigate("Transactions");
      })
      .catch((error) => {
        console.error("Error saving transactions:", error);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Transaction",

      headerRight: () => (
        <Icon
          name="save"
          type="MaterialIcons"
          color={"#33CD48"}
          onPress={() => saveTransaction(amount, account, category, date, note)}
        />
      ),
    });
  }, [navigation, amount, account, category, date, note]);
  return (
    <View style={styles.container}>
      <Switch type={type} setType={setType} />
      <Input
        label={"Amount :"}
        value={amount.toString()}
        setValue={setAmount}
        placeholder={"0"}
        keyboardType={"decimal-pad"}
      />
      <Input
        label={"Account :"}
        datalist={accounts}
        value={account}
        setValue={setAccount}
      />
      <Input
        label={"Category :"}
        datalist={categories}
        value={category}
        setValue={setCategory}
      />
      <Input label={"Date :"} date={date} setDate={setDate} />
      <Input label={"Note :"} value={note} setValue={setNote} line={4} />
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    alignItems: "center",
  },
  datetime: {
    width: "90%",
    height: "6%",
    backgroundColor: "yellow",
    marginTop: 25,
  },
});
