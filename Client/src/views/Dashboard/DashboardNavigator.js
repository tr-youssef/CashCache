import React, { useState } from "react";
import { DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerContext } from "../../utils/context/DrawerContext.js";
import { Icon } from "@rneui/themed";
import Dashboard from "./Dashboard.js";
import Settings from "../Settings/Settings.js";
import { colors } from "../../utils/theme/theme.js";

const DashboardNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const screenOptions = {
    headerStyle: {
      backgroundColor: "#1A251D",
    },
    headerTintColor: "#F2FFF5", // Set the desired text color for the header
  };
  return (
    <DrawerContext.Provider value={{ drawerIsOpen, setDrawerIsOpen }}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerLeft: () => (
              <Icon
                name="filter-alt"
                type="MaterialIcons"
                color={"#33CD48"}
                onPress={() => {
                  setDrawerIsOpen(!drawerIsOpen);
                }}
              />
            ),
            headerRight: () => <Icon name="settings" color={"#33CD48"} type="MaterialIcons" onPress={() => navigation.navigate("Settings")} />,
          }}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </DrawerContext.Provider>
  );
};

export default DashboardNavigator;
