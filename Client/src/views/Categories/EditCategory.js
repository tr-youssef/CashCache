import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Icon } from "@rneui/themed";
import Input from "../../components/Input/Input.js";
import IconsSelector from "../../components/IconsSelector/IconsSelector.js";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { useState } from "react";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";

const EditCategory = ({ route, navigation }) => {
  const { category } = route.params;
  const categoryContext = useContext(CategoriesContext);
  const { setCategories } = categoryContext;
  const data = [
    { label: "Expense", value: "Expense" },
    { label: "Income", value: "Income" },
    { label: "Transfer", value: "Transfer" },
  ];
  const icons = ["fastfood", "home", "local-movies", "airplanemode-active", "payments", "compare-arrows"];
  const [choiceCategory, setChoiceCategory] = useState(category.icon);
  const [name, setName] = useState(category.name);
  const [type, setType] = useState(data.length > 0 ? category.type : "");

  const updateCategory = (name, type, choiceCategory, category) => {
    callAPI(`/api/categories/parent/${category._id}`, "PATCH", { name: name, type: type, icon: choiceCategory, subcategories: category.subcategories }, token)
      .then(async () => {
        await callAPI("/api/categories/parents", "GET", "", token).then((res) => setCategories(res));
        navigation.navigate("Categories");
      })
      .catch((error) => {
        console.error("Error saving category:", error);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit Category",

      headerRight: () => <Icon name="save" type="MaterialIcons" color={"#33CD48"} onPress={() => updateCategory(name, type, choiceCategory, category)} />,
    });
  }, [navigation, name, type, choiceCategory]);

  return (
    <View style={styles.container}>
      <Input label={"Name :"} value={name} setValue={setName} />
      <Input label={"Type :"} datalist={data} value={type} setValue={setType} />
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

export default EditCategory;
