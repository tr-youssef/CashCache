import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#F2FFF5",
  },
});
