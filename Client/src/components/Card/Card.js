import { StyleSheet, Text, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { currencyFormatter } from "../../utils/localization.js";

const Card = ({ name, accountNumber, type, balance }) => {
  function randomHalf() {
    return Math.random() < 0.5;
  }

  function formatAccountNumber(number) {
    const formattedNumber = number.toString().padStart(16, "0");
    const result = formattedNumber.replace(/(\d{4})/g, "$1 ").trim();
    return result;
  }

  function isVisa() {
    var cardName = new String(name);
    return type == "credit" && cardName.toUpperCase().includes("VISA");
  }

  function isMastercard() {
    var cardName = new String(name);
    return type == "credit" && cardName.toUpperCase().includes("MASTERCARD");
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#72AEEB", "#C99DF3"]} style={styles.background} />
      <View style={styles.top}>
        <Image style={styles.hologram} source={require("../../../assets/hologram.png")} />
        {isVisa() && <Image style={styles.logo} source={require("../../../assets/visa.png")} />}
        {isMastercard() && <Image style={styles.logo} source={require("../../../assets/MasterCard.png")} />}
      </View>
      <View style={styles.containerAccountNumber}>
        <Text style={styles.text}>{formatAccountNumber(accountNumber)}</Text>
      </View>
      <View style={styles.containerBalance}>
        <Text style={styles.text}>Balance: {currencyFormatter(balance)}</Text>
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
    color: "#F2FFF5",
    fontFamily: "Inconsolata_400Regular",
    letterSpacing: 2,
  },
  containerAccountNumber: {
    width: "100%",
    alignItems: "center",
  },
  containerBalance: {
    marginTop: 10,
    paddingLeft: 22,
  },
  logo: {},
  hologram: {},
});
