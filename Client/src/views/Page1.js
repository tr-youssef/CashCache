import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const Page1 = ({ navigation }) => {
  function onWelcome() {
    navigation.navigate("Welcome");
  }
  return (
    <View style={styles.container}>
      <Text>Page 1</Text>
      <Button onPress={onWelcome} title="Welcome" color="#f194ff" />
    </View>
  );
};

export default Page1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
