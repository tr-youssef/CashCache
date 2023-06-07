import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { callAPI } from "../../utils/fetch/callAPI.js";
import Switch from "../../components/Switch/Switch.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import DisplayBar from "../../components/DisplayBar/DisplayBar.js";
import token from "../../utils/token.js";

const SubCategories = ({ route }) => {
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState("Expense");
  const [search, setSearch] = useState("");
  const { idParent, subCategories, typeCategory, label, icon } = route.params;
  useEffect(() => {
    callAPI(
      "/api/categories/child1",
      "GET",
      { idParent: idParent },
      token
    ).then((res) => setCategories(res));
  }, []);

  return (
    <View style={styles.container}>
      <Switch type={type} setType={setType} />
      <SearchBar search={search} setSearch={setSearch} />
      {subCategories
        ? subCategories
            .filter((category) => category.type === type)
            .filter((category) =>
              category.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((category) => {
              return (
                <DisplayBar
                  key={category._id}
                  type="category"
                  icon={category.icon}
                  label={category.name}
                />
              );
            })
        : ""}
    </View>
  );
};

export default SubCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    alignItems: "center",
  },
});
