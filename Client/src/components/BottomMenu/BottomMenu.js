import React from "react";
import { Icon } from "@rneui/themed";
import { navigationRef } from "../../../src/utils/navigation/RootNavigation.js";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardNavigator from "../../../src/views/Dashboard/DashboardNavigator.js";
import CategoriesNavigator from "../../../src/views/Categories/CategoriesNavigator.js";
import AccountsNavigator from "../../../src/views/Accounts/AccountsNavigator.js";
import TransactionsNavigator from "../../../src/views/Transactions/TransactionsNavigator.js";

const BottomMenu = ({ onLayoutRootView }) => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer onReady={onLayoutRootView} ref={navigationRef}>
      <Tab.Navigator>
        <Tab.Screen
          name="DashboardNavigator"
          component={DashboardNavigator}
          options={{
            tabBarLabel: "Dashboard",
            tabBarIcon: () => <Icon name="dashboard" type="MaterialIcons" />,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="CategoriesNavigator"
          component={CategoriesNavigator}
          options={{
            tabBarLabel: "Categories",
            tabBarIcon: () => <Icon name="category" type="MaterialIcons" />,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AccountsNavigator"
          component={AccountsNavigator}
          options={{
            tabBarLabel: "Accounts",
            tabBarIcon: ({ color, size }) => <Icon name="account-balance-wallet" type="MaterialIcons" />,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="TransactionsNavigator"
          component={TransactionsNavigator}
          options={{
            tabBarLabel: "Transactions",
            tabBarIcon: ({ color, size }) => <Icon name="format-list-bulleted" type="MaterialIcons" />,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomMenu;
