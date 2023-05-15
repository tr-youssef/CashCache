import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { callAPI } from "./src/utils/fetch/callAPI.js";

export default function App() {
  const [test, setTest] = useState("");
  callAPI("http://localhost:4001/api/test", "GET", "", "").then((res) => setTest(res.message));
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!!!</Text>
      <Text>{test}</Text>
      <StatusBar style="auto" />
    </View>
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
