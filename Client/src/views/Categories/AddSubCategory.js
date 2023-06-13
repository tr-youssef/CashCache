import { StyleSheet, View } from "react-native";
import React, { useState, useContext } from "react";
import { Icon } from "@rneui/themed";
import Input from "../../components/Input/Input.js";
import IconsSelector from "../../components/IconsSelector/IconsSelector.js";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";
import { callAPI } from "../../utils/fetch/callAPI.js";

const AddSubCategory = ({ navigation }) => {
  const categoryContext = useContext(CategoriesContext);
  const { selectedCategory, setSelectedCategory, categories, setCategories } = categoryContext;
  const icons = ["fastfood", "home", "local-movies", "airplanemode-active", "payments", "compare-arrows"];
  const [name, setName] = useState("");
  const [choiceCategory, setChoiceCategory] = useState(icons[0]);

  const saveSubCategory = (name, choiceCategory) => {
    const newSelectedCategory = {
      ...selectedCategory,
      subcategories: [...selectedCategory.subcategories, { name: name, icon: choiceCategory }],
    };
    callAPI(`/api/categories/parent/${selectedCategory._id}`, "PATCH", newSelectedCategory, token)
      .then(async () => {
        await callAPI("/api/categories/parents", "GET", "", token).then((res) => {
          setCategories(res);
          const newCategory = res.find((category) => category._id === selectedCategory._id);
          setSelectedCategory(newCategory);
          navigation.navigate("Subcategory");
        });
      })
      .catch((error) => {
        console.error("Error saving Subcategory:", error);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Subcategory",
      headerRight: () => <Icon name="save" type="MaterialIcons" color={"#33CD48"} onPress={() => saveSubCategory(name, choiceCategory)} />,
    });
  }, [navigation, name, choiceCategory]);

  return (
    <View style={styles.container}>
      <Input label={"Parent :"} value={selectedCategory.name} disabled={true} />
      <Input label={"Type :"} value={selectedCategory.type} disabled={true} />
      <Input label={"Name :"} value={name} setValue={setName} />
      <IconsSelector choiceCategory={choiceCategory} setChoiceCategory={setChoiceCategory} icons={icons} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    alignItems: "center",
  },
});

export default AddSubCategory;
