import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import Categories from "./Categories.js";
import AddCategory from "./AddCategory.js";
import Settings from "../Settings/Settings.js";

const CategoriesNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerRight: () => <Icon name="settings" type="MaterialIcons" onPress={() => navigation.navigate("Settings")} />,
        }}
      />
      <Stack.Screen
        name="Add category"
        component={AddCategory}
        options={{
          headerRight: () => <Icon name="settings" type="MaterialIcons" />,
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default CategoriesNavigator;
