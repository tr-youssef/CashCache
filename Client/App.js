import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Icon } from "@rneui/themed";
import { navigationRef } from "./src/utils/navigation/RootNavigation.js";
import Dashboard from "./src/views/Dashboard.js";
import Categories from "./src/views/Categories.js";
import Accounts from "./src/views/Accounts.js";
import Transactions from "./src/views/Transactions.js";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const Stack = createNativeStackNavigator();
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
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ color, size }) => <Icon name="dashboard" type="MaterialIcons" />,
            headerLeft: () => <Icon style={styles.icon} name="filter-alt" type="MaterialIcons" />,
            headerRight: () => <Icon style={styles.icon} name="settings" type="MaterialIcons" />,
          }}
        />
        <Tab.Screen
          name="Categories"
          component={Categories}
          options={{
            tabBarLabel: "Categories",
            tabBarIcon: ({ color, size }) => <Icon name="category" type="MaterialIcons" />,
            headerRight: () => <Icon style={styles.icon} name="settings" type="MaterialIcons" />,
          }}
        />
        <Tab.Screen
          name="Accounts"
          component={Accounts}
          options={{
            tabBarLabel: "Accounts",
            tabBarIcon: ({ color, size }) => <Icon name="account-balance-wallet" type="MaterialIcons" />,
            headerRight: () => <Icon style={styles.icon} name="settings" type="MaterialIcons" />,
          }}
        />
        <Tab.Screen
          name="Transactions"
          component={Transactions}
          options={{
            tabBarLabel: "Transactions",
            tabBarIcon: ({ color, size }) => <Icon name="format-list-bulleted" type="MaterialIcons" />,
            headerRight: () => <Icon style={styles.icon} name="settings" type="MaterialIcons" />,
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
  icon: {
    marginLeft: 20,
    marginRight: 20,
  },
});
