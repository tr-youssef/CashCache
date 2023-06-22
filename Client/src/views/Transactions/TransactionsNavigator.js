import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { PlaidContext } from "../../utils/context/PlaidContext.js";
import Transactions from "./Transactions.js";
import Settings from "../Settings/Settings.js";
import TransactionsPlaid from "./TransactionsPlaid.js";

const TransactionsNavigator = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const plaidContextValue = {
    linkToken,
    setLinkToken,
    accessToken,
    setAccessToken,
  };

  const screenOptions = {
    headerStyle: {
      backgroundColor: "#1A251D",
    },
    headerTintColor: "#F2FFF5", // Set the desired text color for the header
  };
  return (
    <PlaidContext.Provider value={plaidContextValue}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{
            headerRight: () => <Icon name="settings" color={"#33CD48"} type="MaterialIcons" onPress={() => navigation.navigate("Settings")} />,
          }}
        />
        <Stack.Screen name="Plaid" component={TransactionsPlaid} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </PlaidContext.Provider>
  );
};

export default TransactionsNavigator;
