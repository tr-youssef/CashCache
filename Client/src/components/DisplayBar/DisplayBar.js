import { StyleSheet, Text, View } from "react-native";
import { Icon } from "@rneui/themed";
import React from "react";

const DisplayBar = ({ type = "category", icon, label = "", amount = "" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconTitle}>
        <Icon name={icon} size={20} color="#F2FFF5" type="MaterialIcons" />
        <Text style={styles.text}>{label}</Text>
      </View>
      {type === "category" ? <Icon name="keyboard-arrow-right" size={20} color="#F2FFF5" type="MaterialIcons" /> : <Text>{amount}</Text>}
    </View>
  );
};

export default DisplayBar;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "5%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A251D",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginTop: 5,
    justifyContent: "space-between",
  },
  iconTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 15,
    color: "#F2FFF5",
  },
});
