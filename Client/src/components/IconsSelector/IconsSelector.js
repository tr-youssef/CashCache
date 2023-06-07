import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "@rneui/themed";
import React, { useState } from "react";

const IconsSelector = ({ choice, setChoice, icons }) => {
  const handlePress = (icon) => {
    setChoice(icon);
  };
  return (
    <View style={styles.container}>
      {icons.map((icon, index) => {
        return (
          <TouchableOpacity style={icon === choice ? styles.buttonSelected : styles.button} onPress={() => handlePress(icon)} key={index}>
            <Icon style={styles.icons} name={icons[index]} type="MaterialIcons" size={20} color="#F2FFF5" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default IconsSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    width: "90%",
    height: "70%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icons: {},
  button: {
    backgroundColor: "#1A251D",
    padding: 10,
    margin: 9,
    borderRadius: 10,
  },
  buttonSelected: {
    backgroundColor: "#33CD48",
    padding: 10,
    margin: 9,
    borderRadius: 10,
  },
});
