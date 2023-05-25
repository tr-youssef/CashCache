import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import Transactions from "./Transactions.js";
import Settings from "../Settings/Settings.js";

const TransactionsNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerRight: () => <Icon name="settings" type="MaterialIcons" onPress={() => navigation.navigate("Settings")} />,
        }}
      />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default TransactionsNavigator;
