import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { callAPI } from "../utils/fetch/callAPI.js";

const Welcome = ({ navigation }) => {
  const [test, setTest] = useState("");
  useEffect(() => {
    callAPI("http://localhost:4001/api/test", "GET", "", "").then((res) => setTest(res.message));
  }, []);

  function onPage1() {
    navigation.navigate("Page1");
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!!!</Text>
      <Text>{test}</Text>
      <Button onPress={onPage1} title="Page 1" color="#f194ff" />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
