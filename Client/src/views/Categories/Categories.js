import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text>Categories</Text>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
