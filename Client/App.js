import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import BottomMenu from "./src/components/BottomMenu/BottomMenu.js";

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
  return <BottomMenu />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
