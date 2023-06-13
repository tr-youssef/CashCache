import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";
import { FlatList } from "react-native-gesture-handler";
import { callAPI } from "../../utils/fetch/callAPI.js";
import Swipe from "../../components/Swipe/Swipe.js";
import Switch from "../../components/Switch/Switch.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import DisplayBar from "../../components/DisplayBar/DisplayBar.js";
import AddButton from "../../components/AddButton/AddButton.js";

const Row = ({ item, editAction, deleteAction }) => <DisplayBar key={item._id} category={item} type="subcategory" editAction={editAction} deleteAction={deleteAction} />;

const SwipeableRow = ({ item, index, deleteAction, editAction }) => {
  return (
    <Swipe editAction={editAction} deleteAction={deleteAction}>
      <Row item={item} key={index} />
    </Swipe>
  );
};

const SubCategories = ({ navigation }) => {
  const categoryContext = useContext(CategoriesContext);
  const { selectedCategory, setCategories, setSelectedCategory } = categoryContext;

  const [selectSubCategories, setSelectSubCategories] = useState(selectedCategory);
  const [search, setSearch] = useState("");
  const deleteAction = (idSubCategory) => {
    const newSelectedCategory = {
      ...selectedCategory,
      subcategories: selectedCategory.subcategories.filter((subCategory) => subCategory._id !== idSubCategory),
    };

    callAPI(`/api/categories/parent/${selectedCategory._id}`, "PATCH", newSelectedCategory, token)
      .then(async () => {
        await callAPI("/api/categories/parents", "GET", "", token).then((res) => {
          setCategories(res);
          const newCategory = res.find((category) => category._id === selectedCategory._id);
          setSelectedCategory(newCategory);
        });
      })
      .catch((error) => {
        console.error("Error saving Subcategory:", error);
      });
  };
  const editAction = (subCategory) => {
    navigation.navigate("EditSubcategory", {
      subCategory: subCategory,
    });
  };
  useEffect(() => {
    setSelectSubCategories(selectedCategory.subcategories.filter((category) => category.name.toLowerCase().includes(search.toLowerCase())));
  }, [selectedCategory, search]);
  return (
    <View style={styles.container}>
      <Switch type={selectedCategory.type} disabled={true} />
      <SearchBar search={search} setSearch={setSearch} />
      <DisplayBar key={selectedCategory._id} type="categorySubcategory" category={selectedCategory} disabled={true} />
      <FlatList
        data={selectSubCategories}
        renderItem={({ item, index }) => <SwipeableRow item={item} key={item._id} index={index} editAction={() => editAction(item)} deleteAction={() => deleteAction(item._id)} />}
        keyExtractor={(item, index) => `message ${index}`}
      />

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
