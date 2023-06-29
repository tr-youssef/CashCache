import { StyleSheet, View } from "react-native";
import Input from "../../components/Input/Input.js";
import Switch from "../../components/Switch/Switch.js";
import React, { useState, useEffect } from "react";
import { callAPI } from "../../utils/fetch/callAPI.js";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const AddTransaction = () => {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("Expense");
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState("");
  const [categories, setCategories] = useState("");
  const [categorie, setCategorie] = useState("");
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");

  useEffect(() => {
    callAPI("/api/accounts", "GET", "", token)
      .then((res) => {
        const transformedData = res.map((res) => ({
          label: res.name,
          value: res._id,
        }));
        setAccounts(transformedData);
        setAccount(transformedData[0].value);
      })
      .catch((error) => console.log("error", error));
  }, []);
  useEffect(() => {
    callAPI("/api/categories/parents", "GET", "", token)
      .then((res) => {
        const transformedData = res.map((res) => ({
          label: res.name,
          value: res._id,
          type: res.type,
        }));
        setCategories(transformedData.filter((category) => category.type === type));
        setCategorie(transformedData.filter((category) => category.type === type)[0].value);
      })
      .catch((error) => console.log("error", error));
  }, [type]);
  return (
    <View style={styles.container}>
      <Switch type={type} setType={setType} />
      <Input label={"Amount :"} value={amount.toString()} setValue={setAmount} />
      <Input label={"Account :"} datalist={accounts} value={account} setValue={setAccount} />
      <Input label={"Category :"} datalist={categories} value={categorie} setValue={setCategorie} />
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
