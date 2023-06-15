import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

const DeleteButton = ({ screen, action }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (screen === "AddAccount") {
      action();
      navigation.navigate("Accounts");
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Icon name="delete" size={20} color="#33CD48" type="MaterialIcons" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  button: {
    backgroundColor: "#1A251D",
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DeleteButton;
