import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerContext } from "../../utils/context/DrawerContext.js";
import { Icon } from "@rneui/themed";
import Dashboard from "./Dashboard.js";
import Settings from "../Settings/Settings.js";

const DashboardNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  return (
    <DrawerContext.Provider value={{ drawerIsOpen, setDrawerIsOpen }}>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerLeft: () => (
              <Icon
                name="filter-alt"
                type="MaterialIcons"
                onPress={() => {
                  setDrawerIsOpen(!drawerIsOpen);
                }}
              />
            ),
            headerRight: () => <Icon name="settings" type="MaterialIcons" onPress={() => navigation.navigate("Settings")} />,
          }}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </DrawerContext.Provider>
  );
};

export default DashboardNavigator;
