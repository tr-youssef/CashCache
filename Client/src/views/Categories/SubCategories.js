import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";
import { FlatList } from "react-native-gesture-handler";
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

const SubCategories = () => {
  const categoryContext = useContext(CategoriesContext);
  const { selectedCategory } = categoryContext;
  const [search, setSearch] = useState("");
  const deleteAction = () => {
    alert("delete");
  };
  const editAction = () => {
    alert("edit");
  };
  return (
    <View style={styles.container}>
      <Switch type={selectedCategory.type} disabled={true} />
      <SearchBar search={search} setSearch={setSearch} />
      <DisplayBar key={selectedCategory._id} type="categorySubcategory" category={selectedCategory} disabled={true} />
      <FlatList
        data={selectedCategory.subcategories}
        renderItem={({ item, index }) => <SwipeableRow item={item} key={item._id} index={index} editAction={editAction} deleteAction={deleteAction} />}
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
