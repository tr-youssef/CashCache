import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import Accounts from "./Accounts.js";
import Settings from "../Settings/Settings.js";

const AccountsNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Accounts"
        component={Accounts}
        options={{
          headerRight: () => <Icon name="settings" type="MaterialIcons" onPress={() => navigation.navigate("Settings")} />,
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default AccountsNavigator;
