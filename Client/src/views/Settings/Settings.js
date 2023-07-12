import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { Icon } from "@rneui/themed";

const Settings = () => {
  const handlePress = () => {};
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Icon name="add" size={20} color="#33CD48" type="MaterialIcons" />
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#1A251D",
    padding: 10,
    borderRadius: 50,
  },
  text: {
    color: "#F2FFF5",
  },
});
