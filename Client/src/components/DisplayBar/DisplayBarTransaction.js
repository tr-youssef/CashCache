import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";

import { RectButton } from "react-native-gesture-handler";

const DisplayBarTransaction = ({ type = "transaction", transaction, amount = "", disabled }) => {
  // const navigation = useNavigation();
  // const categoryContext = useContext(CategoriesContext);
  // const { setSelectedCategory } = categoryContext;
  const handlePress = () => {
    // if (type === "category") {
    //   setSelectedCategory(category);
    //   navigation.navigate("Subcategory");
    // }
  };

  return (
    <View style={styles.container}>
      <RectButton style={styles.rectButton} onPress={handlePress}>
        <View style={styles.iconTitle}>
          {transaction.category.length > 0 ? (
            <View style={styles.iconTitle}>
              <Icon name={transaction.category[0]?.icon} size={20} color="#F2FFF5" type="MaterialIcons" />
              <Text style={styles.text}>{transaction.category[0]?.name}</Text>
            </View>
          ) : (
            <View style={styles.iconTitle}>
              <Icon name={transaction.subCategory[0]?.subcategories[0]?.icon} size={20} color="#F2FFF5" type="MaterialIcons" />
              <Text style={styles.text}>{transaction.subCategory[0]?.subcategories[0].name}</Text>
            </View>
          )}
        </View>
        <Text style={styles.text}>{transaction.amount}</Text>
      </RectButton>
    </View>
  );
};

export default DisplayBarTransaction;

const styles = StyleSheet.create({
  container: {
    width: 350,
    backgroundColor: "#1A251D",
    borderRadius: 20,
    marginTop: 5,
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
