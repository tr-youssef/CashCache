import { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
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
  });

  const Stack = createNativeStackNavigator();

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

  if (isloading) {
    return <MySplashScreen />;
  } else
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" hide>
          <Stack.Screen
            component={BottomMenu}
            name="Home"
            options={{ headerShown: false }}
            // onLayoutRootView={onLayoutRootView}
          />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  // return <BottomMenu onLayoutRootView={onLayoutRootView} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
