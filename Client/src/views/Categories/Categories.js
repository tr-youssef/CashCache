import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { FlatList } from "react-native-gesture-handler";

import Switch from "../../components/Switch/Switch.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import Swipe from "../../components/Swipe/Swipe.js";
import DisplayBar from "../../components/DisplayBar/DisplayBar.js";
// import token from "../../utils/token.js";
import AddButton from "../../components/AddButton/AddButton.js";

const Row = ({ item, editAction, deleteAction }) => (
  <DisplayBar
    key={item._id}
    category={item}
    type="category"
    editAction={editAction}
    deleteAction={deleteAction}
  />
);

const SwipeableRow = ({ item, index, deleteAction, editAction }) => {
  return (
    <Swipe editAction={editAction} deleteAction={deleteAction}>
      <Row item={item} key={index} />
    </Swipe>
  );
};

const Categories = ({ navigation }) => {
  const categoryContext = useContext(CategoriesContext);
  const { categories, setCategories } = categoryContext;
  const [selectCategories, setSelectCategories] = useState(categories);

  const [type, setType] = useState("Expense");
  const [search, setSearch] = useState("");

  const deleteAction = (idCategory) => {
    callAPI(`/api/categories/${idCategory}`, "DELETE", {})
      .then(async () => {
        await callAPI("/api/categories/parents", "GET", "").then((res) =>
          setCategories(res)
        );
      })
      .catch((error) => {
        console.error("Error saving category:", error);
      });
  };
  const editAction = (category) => {
    navigation.navigate("EditCategory", {
      category: category,
    });
  };

  useEffect(() => {
    callAPI("/api/categories/parents", "GET")
      .then((res) => setCategories(res))
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    setSelectCategories(
      categories.filter(
        (category) =>
          category.type === type &&
          category.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [categories, type, search]);
  return (
    <View style={styles.container}>
      <Switch type={type} setType={setType} />
      <SearchBar search={search} setSearch={setSearch} />
      <FlatList
        data={selectCategories}
        renderItem={({ item, index }) => (
          <SwipeableRow
            item={item}
            key={item._id}
            index={index}
            editAction={() => editAction(item)}
            deleteAction={() => deleteAction(item._id)}
          />
        )}
        keyExtractor={(item, index) => `message ${index}`}
      />
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
