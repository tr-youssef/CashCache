import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { callAPI } from "../../utils/fetch/callAPI.js";
import Switch from "../../components/Switch/Switch.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import DisplayBar from "../../components/DisplayBar/DisplayBar.js";
import AddButton from "../../components/AddButton/AddButton.js";
import token from "../../utils/token.js";

const Categories = ({ categories, setCategories }) => {
  const [type, setType] = useState("Expense");
  const [search, setSearch] = useState("");

  useEffect(() => {
    callAPI("/api/categories/parents", "GET", "", token)
      .then((res) => setCategories(res))
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <View style={styles.container}>
      <Switch type={type} setType={setType} />
      <SearchBar search={search} setSearch={setSearch} />
      {categories
        ? categories
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
                  idParent={category._id}
                  subCategories={category.subCategories}
                  typeCategory={type}
                />
              );
            })
        : ""}
      <AddButton />
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
