import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";
import Switch from "../../components/Switch/Switch.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import DisplayBar from "../../components/DisplayBar/DisplayBar.js";
import AddButton from "../../components/AddButton/AddButton.js";

const SubCategories = () => {
  const categoryContext = useContext(CategoriesContext);
  const { selectedCategory } = categoryContext;
  const [search, setSearch] = useState("");
  return (
    <View style={styles.container}>
      <Switch type={selectedCategory.type} disabled={true} />
      <SearchBar search={search} setSearch={setSearch} />
      <DisplayBar key={selectedCategory._id} type="categorySubcategory" category={selectedCategory} disabled={true} />
      {selectedCategory && selectedCategory.subcategories
        ? selectedCategory.subcategories
            .filter((category) => category.name.toLowerCase().includes(search.toLowerCase()))
            .map((category) => {
              return <DisplayBar key={category._id} type="subcategory" category={category} disabled={true} />;
            })
        : ""}
      <AddButton screen={"AddSubcategory"} />
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
