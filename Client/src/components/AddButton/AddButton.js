import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";

const BottomLeftButton = ({ screen }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (screen === "AddCategory") navigation.navigate("AddCategory");
    else if (screen === "AddSubcategory") navigation.navigate("AddSubcategory");
    else if (screen === "AddAccount") navigation.navigate("AddAccount");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Icon name="add" size={20} color="#F2FFF5" type="MaterialIcons" />
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

export default BottomLeftButton;
