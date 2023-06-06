import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Config from "react-native-config";
import { callAPI } from "../../utils/fetch/callAPI.js";
import Switch from "../../components/Switch/Switch.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import DisplayBar from "../../components/DisplayBar/DisplayBar.js";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState("Expense");
  const [search, setSearch] = useState("");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyLnlvdXNzZWZAZ21haWwuY29tIiwiaWQiOiI2NDdlZDUxNzY1YTY1YmRmMDhmMWJkZmUiLCJpYXQiOjE2ODYwMzM5NjIsImV4cCI6MTY4NjA3NzE2Mn0.ZueVTY6_3kRRjvZHq-WviQrUTn3f13PBDY89wqRysik";
  useEffect(() => {
    callAPI("http://localhost:4001/api/categories/parents", "GET", "", token).then((res) => setCategories(res));
  }, []);
  return (
    <View style={styles.container}>
      <Switch type={type} setType={setType} />
      <SearchBar search={search} setSearch={setSearch} />
      {categories
        .filter((category) => category.type === type)
        .filter((category) => category.name.toLowerCase().includes(search.toLowerCase()))
        .map((category) => {
          return <DisplayBar key={category._id} type="category" icon={category.icon} label={category.name} />;
        })}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    alignItems: "center",
  },
});
