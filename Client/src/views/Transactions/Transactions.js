import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Transactions = () => {
  return (
    <View style={styles.container}>
      <Text>Transactions</Text>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
