import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const Card = ({ name, initialAmount }) => {
  function randomHalf() {
    return Math.random() < 0.5;
  }
  function formatNumber(number) {
    const formattedNumber = number.toString().padStart(16, "0");
    const result = formattedNumber.replace(/(\d{4})/g, "$1 ").trim();
    return result;
  }
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#72AEEB", "#C99DF3"]} style={styles.background} />
      <View style={styles.top}>
        <Image style={styles.hologram} source={require("../../../assets/hologram.png")} />
        <Image style={styles.logo} source={require("../../../assets/visa.png")} />
      </View>
      <View style={styles.containerAmount}>
        <Text style={styles.text}>{formatNumber(initialAmount)}</Text>
      </View>
      <View style={styles.containerName}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
          {name}
        </Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    borderRadius: 25,
    justifyContent: "space-between",
    width: 240,
    height: 150,
  },
  top: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  background: {
    borderRadius: 25,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  containerName: {
    width: "100%",
    paddingLeft: 22,
    paddingBottom: 15,
  },
  text: {
    color: "white",
    fontFamily: "Inconsolata_400Regular",
    letterSpacing: 2,
  },
  containerAmount: {
    width: "100%",
    alignItems: "center",
  },
  logo: {},
  hologram: {},
});
