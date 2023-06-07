import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import React from "react";

const DisplayBar = ({ type = "category", icon, label, amount = "", idParent, subCategories, typeCategory }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (type === "category") {
      navigation.navigate("SubCategory", {
        idParent: idParent,
        subCategories: subCategories,
        typeCategory: typeCategory,
        label: label,
        icon: icon,
      });
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <View style={styles.iconTitle}>
          <Icon name={icon} size={20} color="#F2FFF5" type="MaterialIcons" />
          <Text style={styles.text}>{label}</Text>
        </View>
        {type === "category" ? <Icon name="keyboard-arrow-right" size={20} color="#F2FFF5" type="MaterialIcons" /> : <Text>{amount}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default DisplayBar;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "5%",
    backgroundColor: "#1A251D",
    borderRadius: 20,
    marginTop: 5,
  },
  button: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
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
