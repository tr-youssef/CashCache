import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { callAPI } from "../../utils/fetch/callAPI.js";
import Categories from "./Categories.js";
import AddCategory from "./AddCategory.js";
import Settings from "../Settings/Settings.js";
import SubCategories from "./SubCategories.js";
import token from "../../utils/token.js";

const CategoriesNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();

  const [categories, setCategories] = useState([]);
  const icons = [
    "fastfood",
    "home",
    "local-movies",
    "airplanemode-active",
    "payments",
    "compare-arrows",
  ];
  const [name, setName] = useState("");
  const data = [
    { label: "Expense", value: "Expense" },
    { label: "Income", value: "Income" },
    { label: "Transfer", value: "Transfer" },
  ];
  const [type, setType] = useState(data.length > 0 ? data[0].value : "");
  const [choice, setChoice] = useState(icons[0]);
  const saveCategory = (name, type, choice) => {
    callAPI(
      "/api/categories/parent",
      "POST",
      { name: name, type: type, icon: choice },
      token
    )
      .then(async () => {
        await callAPI("/api/categories/parents", "GET", "", token).then((res) =>
          setCategories(res)
        );
        navigation.navigate("Categories");
      })
      .catch((error) => {
        console.error("Error saving category:", error);
      });
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        options={{
          headerRight: () => (
            <Icon
              name="settings"
              type="MaterialIcons"
              onPress={() => navigation.navigate("Settings")}
            />
          ),
        }}
      >
        {(props) => (
          <Categories
            {...props}
            categories={categories}
            setCategories={setCategories}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="AddCategory"
        options={{
          headerRight: () => (
            <Icon
              name="save"
              type="MaterialIcons"
              onPress={() => saveCategory(name, type, choice)}
            />
          ),
        }}
      >
        {(props) => (
          <AddCategory
            {...props}
            icons={icons}
            name={name}
            setName={setName}
            data={data}
            type={type}
            setType={setType}
            choice={choice}
            setChoice={setChoice}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="SubCategory"
        component={SubCategories}
        options={{
          headerRight: () => <Icon name="settings" type="MaterialIcons" />,
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default CategoriesNavigator;
