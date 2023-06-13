import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Transactions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Transactions</Text>
    </View>
  );
};

export default Transactions;

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
