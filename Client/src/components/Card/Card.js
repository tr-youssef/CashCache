import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Card = ({ name, initialAmount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{initialAmount}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: "white",
    width: "60%",
    height: "20%",
    borderRadius: 25,
  },
  text: {
    color: "red",
  },
});
