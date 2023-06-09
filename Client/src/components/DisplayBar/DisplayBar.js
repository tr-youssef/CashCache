import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { useContext } from "react";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";
import React from "react";

const DisplayBar = ({ type = "category", category, icon, label, amount = "", disabled }) => {
  const navigation = useNavigation();
  const categoryContext = useContext(CategoriesContext);
  const { setSelectedCategory } = categoryContext;
  const handlePress = () => {
    if (type === "category") {
      setSelectedCategory(category);
      navigation.navigate("Subcategory");
    }
  };
  if (disabled)
    return (
      <View style={type === "categorySubcategory" ? styles.containerCategorySubcategory : styles.container}>
        <View style={styles.button}>
          <View style={styles.iconTitle}>
            <Icon name={icon} size={20} color="#F2FFF5" type="MaterialIcons" />
            <Text style={styles.text}>{label}</Text>
          </View>
          {type === "category" ? (
            <Icon name="keyboard-arrow-right" size={20} color="#F2FFF5" type="MaterialIcons" />
          ) : type === "categorySubcategory" ? (
            <Icon name="keyboard-arrow-down" size={20} color="#F2FFF5" type="MaterialIcons" />
          ) : type === "subcategory" ? (
            ""
          ) : (
            <Text>{amount}</Text>
          )}
        </View>
      </View>
    );
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <View style={styles.iconTitle}>
          <Icon name={icon} size={20} color="#F2FFF5" type="MaterialIcons" />
          <Text style={styles.text}>{label}</Text>
        </View>
        {type === "category" ? <Icon name="keyboard-arrow-right" size={20} color="#F2FFF5" type="MaterialIcons" /> : type === "subcategory" ? <Icon name="keyboard-arrow-down" size={20} color="#F2FFF5" type="MaterialIcons" /> : <Text>{amount}</Text>}
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
  containerCategorySubcategory: {
    width: "90%",
    height: "5%",
    backgroundColor: "#1A251D",
    borderRadius: 20,
    marginBottom: 40,
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
