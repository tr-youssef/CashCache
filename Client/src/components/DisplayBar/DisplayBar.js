import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";

import { RectButton } from "react-native-gesture-handler";

const DisplayBar = ({ type = "category", category, disabled }) => {
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
        <View style={styles.rectButton}>
          <View style={styles.iconTitle}>
            <Icon name={category?.icon} size={20} color="#F2FFF5" type="MaterialIcons" />
            <Text style={styles.text}>{category?.name}</Text>
          </View>
          {type === "category" ? <Icon name="keyboard-arrow-right" size={20} color="#F2FFF5" type="MaterialIcons" /> : type === "categorySubcategory" ? <Icon name="keyboard-arrow-down" size={20} color="#F2FFF5" type="MaterialIcons" /> : ""}
        </View>
      </View>
    );
  return (
    <View style={styles.container}>
      <RectButton style={styles.rectButton} onPress={handlePress}>
        <View style={styles.iconTitle}>
          <Icon name={category?.icon} size={20} color="#F2FFF5" type="MaterialIcons" />
          <Text style={styles.text}>{category?.name}</Text>
        </View>
        {type === "category" ? <Icon name="keyboard-arrow-right" size={20} color="#F2FFF5" type="MaterialIcons" /> : type === "subcategory" ? "" : <Text>{amount}</Text>}
      </RectButton>
    </View>
  );
};

export default DisplayBar;

const styles = StyleSheet.create({
  container: {
    width: 350,
    backgroundColor: "#1A251D",
    borderRadius: 20,
    marginTop: 5,
    borderColor: "#33CD48",
    borderWidth: 1,
  },
  containerCategorySubcategory: {
    width: 350,
    backgroundColor: "#1A251D",
    borderRadius: 20,
    marginBottom: 40,
  },
  rectButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
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
