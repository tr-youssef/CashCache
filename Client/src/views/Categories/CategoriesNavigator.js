import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";
import Categories from "./Categories.js";
import AddCategory from "./AddCategory.js";
import AddSubCategory from "./AddSubCategory.js";
import Settings from "../Settings/Settings.js";
import SubCategories from "./SubCategories.js";
import EditCategory from "./EditCategory.js";
import EditSubCategory from "./EditSubCategory.js";

const CategoriesNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryContextValue = {
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
  };

  const screenOptions = {
    headerStyle: {
      backgroundColor: "#1A251D",
    },
    headerTintColor: "#F2FFF5",
  };
  return (
    <CategoriesContext.Provider value={categoryContextValue}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            headerRight: () => <Icon name="settings" type="MaterialIcons" color={"#33CD48"} onPress={() => navigation.navigate("Settings")} />,
          }}
        />
        <Stack.Screen
          name="AddCategory"
          component={AddCategory}
          options={{
            headerRight: () => <Icon name="save" type="MaterialIcons" color={"#33CD48"} onPress={() => saveCategory(nameCategory, type, choiceCategory)} />,
          }}
        />
        <Stack.Screen
          name="EditCategory"
          component={EditCategory}
          options={{
            headerRight: () => <Icon name="save" type="MaterialIcons" color={"#33CD48"} onPress={() => saveCategory(nameCategory, type, choiceCategory)} />,
          }}
        />
        <Stack.Screen
          name="Subcategory"
          component={SubCategories}
          options={{
            headerRight: () => <Icon name="settings" type="MaterialIcons" color={"#33CD48"} />,
          }}
        />
        <Stack.Screen
          name="AddSubcategory"
          component={AddSubCategory}
          options={{
            headerRight: () => <Icon name="save" type="MaterialIcons" color={"#33CD48"} onPress={() => saveSubCategory(nameSubCategory, type, choiceSubCategory)} />,
          }}
        />
        <Stack.Screen
          name="EditSubcategory"
          component={EditSubCategory}
          options={{
            headerRight: () => <Icon name="save" type="MaterialIcons" color={"#33CD48"} onPress={() => saveSubCategory(nameSubCategory, type, choiceSubCategory)} />,
          }}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </CategoriesContext.Provider>
  );
};

export default CategoriesNavigator;
