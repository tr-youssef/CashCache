import React from "react";
import { Icon } from "@rneui/themed";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { navigationRef } from "../../../src/utils/navigation/RootNavigation.js";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardNavigator from "../../../src/views/Dashboard/DashboardNavigator.js";
import CategoriesNavigator from "../../../src/views/Categories/CategoriesNavigator.js";
import AccountsNavigator from "../../../src/views/Accounts/AccountsNavigator.js";
import TransactionsNavigator from "../../../src/views/Transactions/TransactionsNavigator.js";
import BotNavigator from "../../../src/views/Youai/YouaiNavigator.js";

const BottomMenu = ({ onLayoutRootView }) => {
  const Tab = createBottomTabNavigator();

  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarStyle: { backgroundColor: "#1A251D", borderTopWidth: 0 },
    tabBarActiveTintColor: "#33CD48",
    tabBarInactiveTintColor: "rgba(51, 205, 72, 0.4)",
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer independent={true} ref={navigationRef}>
        <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen
            name="DashboardNavigator"
            component={DashboardNavigator}
            options={({ route }) => ({
              tabBarLabel: "Dashboard",
              tabBarIcon: ({ focused }) => <Icon color={focused ? "#33CD48" : "rgba(51, 205, 72, 0.4)"} name="dashboard" type="MaterialIcons" />,
              headerShown: false,
            })}
          />
          <Tab.Screen
            name="CategoriesNavigator"
            component={CategoriesNavigator}
            options={{
              tabBarLabel: "Categories",
              tabBarIcon: ({ focused }) => <Icon color={focused ? "#33CD48" : "rgba(51, 205, 72, 0.4)"} name="category" type="MaterialIcons" />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="AccountsNavigator"
            component={AccountsNavigator}
            options={{
              tabBarLabel: "Accounts",
              tabBarIcon: ({ focused }) => <Icon color={focused ? "#33CD48" : "rgba(51, 205, 72, 0.4)"} name="account-balance-wallet" type="MaterialIcons" />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="TransactionsNavigator"
            component={TransactionsNavigator}
            options={{
              tabBarLabel: "Transactions",
              tabBarIcon: ({ focused }) => <Icon color={focused ? "#33CD48" : "rgba(51, 205, 72, 0.4)"} name="format-list-bulleted" type="MaterialIcons" />,
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="AI Assistant"
            component={BotNavigator}
            options={{
              tabBarIcon: ({ focused }) => <Icon color={focused ? "#33CD48" : "rgba(51, 205, 72, 0.4)"} name="memory" type="material-icons" />,

              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default BottomMenu;
