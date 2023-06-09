import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";
import Switch from "../../components/Switch/Switch.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import DisplayBar from "../../components/DisplayBar/DisplayBar.js";
import AddButton from "../../components/AddButton/AddButton.js";
import token from "../../utils/token.js";

const Categories = () => {
  const categoryContext = useContext(CategoriesContext);
  const { categories, setCategories } = categoryContext;

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
            .filter((category) => category.name.toLowerCase().includes(search.toLowerCase()))
            .map((category) => {
              return <DisplayBar key={category._id} category={category} type="category" icon={category.icon} label={category.name} subCategories={category.subCategories} />;
            })
        : ""}
      <AddButton screen={"AddCategory"} />
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
