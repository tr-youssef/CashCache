import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Icon } from "@rneui/themed";
import { navigationRef } from "./src/utils/navigation/RootNavigation.js";
import DashboardNavigator from "./src/views/Dashboard/DashboardNavigator.js";
import CategoriesNavigator from "./src/views/Categories/CategoriesNavigator.js";
import AccountsNavigator from "./src/views/Accounts/AccountsNavigator.js";
import TransactionsNavigator from "./src/views/Transactions/TransactionsNavigator.js";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const Tab = createBottomTabNavigator();
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
