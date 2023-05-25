import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AddCategory = () => {
  return (
    <View style={styles.container}>
      <Text>Add Category</Text>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
