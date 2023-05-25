import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Accounts = () => {
  return (
    <View style={styles.container}>
      <Text>Accounts</Text>
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
