import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Switch from "../../components/Switch/Switch.js";

const Categories = () => {
  return (
    <View style={styles.container}>
      <Switch />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A251D",
    alignItems: "center",
    justifyContent: "center",
  },
});
