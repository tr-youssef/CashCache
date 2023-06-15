import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Inconsolata_400Regular } from "@expo-google-fonts/inconsolata";
import BottomMenu from "./src/components/BottomMenu/BottomMenu.js";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/views/Login/LoginScreen.js";
import MySplashScreen from "./src/utils/MySplashScreen/MySplashScreen.js";
// import HomeScreen from "./src/views/HomeScreen.js";

// SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inconsolata_400Regular,
  });

  // const onLayoutRootView = useCallback(async () => {
  //   await SplashScreen.hideAsync();
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  const [isloading, setisloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setisloading(!isloading);
    }, 3000);
  }, []);

  if (!fontsLoaded || isloading) {
    return <MySplashScreen />;
  }
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" hide>
        <Stack.Screen
          component={BottomMenu}
          name="Home"
          options={{ headerShown: false }}
          // onLayoutRootView={onLayoutRootView}
        ></Stack.Screen>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomMenu onLayoutRootView={onLayoutRootView} />
    </GestureHandlerRootView>
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
