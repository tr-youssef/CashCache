import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const Card = ({ name, initialAmount }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#72AEEB", "#C99DF3"]}
        style={styles.background}
      />
      <Image source="/assets/MasterCard.png" />
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{initialAmount}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: "orange",
    width: "60%",
    height: "20%",
    borderRadius: 25,
  },
  background: {
    borderRadius: 25,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  text: {
    color: "red",
  },
});
