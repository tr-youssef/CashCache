import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AddButton from "../../components/AddButton/AddButton.js";

const Accounts = () => {
  return (
    <View style={styles.container}>
      <AddButton screen={"AddAccount"} />
    </View>
  );
};

export default Accounts;

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
