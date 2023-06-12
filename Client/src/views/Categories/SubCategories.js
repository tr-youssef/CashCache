import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";
import { FlatList } from "react-native-gesture-handler";
import useSwipe from "../../components/Swipe/Swipe.js";
import Switch from "../../components/Switch/Switch.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import DisplayBar from "../../components/DisplayBar/DisplayBar.js";
import AddButton from "../../components/AddButton/AddButton.js";

const Row = ({ item }) => <DisplayBar key={item._id} category={item} type="subcategory" />;

const SwipeableRow = ({ item, index }) => {
  const { Swipe, close } = useSwipe();
  return (
    <Swipe>
      <Row item={item} key={index} />
    </Swipe>
  );
};

const SubCategories = () => {
  const categoryContext = useContext(CategoriesContext);
  const { selectedCategory } = categoryContext;
  const [search, setSearch] = useState("");
  return (
    <View style={styles.container}>
      <Switch type={selectedCategory.type} disabled={true} />
      <SearchBar search={search} setSearch={setSearch} />
      <DisplayBar key={selectedCategory._id} type="categorySubcategory" category={selectedCategory} disabled={true} />
      <FlatList data={selectedCategory.subcategories} renderItem={({ item, index }) => <SwipeableRow item={item} key={item._id} index={index} />} keyExtractor={(item, index) => `message ${index}`} />

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
