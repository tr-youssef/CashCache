import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import Bot from "./youai.js";
import Settings from "../Settings/Settings.js";

const BotNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerStyle: {
      backgroundColor: "#1A251D",
    },
    headerTintColor: "#F2FFF5", // Set the desired text color for the header
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Transactions"
        component={Bot}
        options={{
          headerRight: () => (
            <Icon
              name="settings"
              color={"#33CD48"}
              type="MaterialIcons"
              onPress={() => navigation.navigate("Settings")}
            />
          ),
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default BotNavigator;
