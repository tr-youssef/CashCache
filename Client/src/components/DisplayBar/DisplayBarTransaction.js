import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";

import { RectButton } from "react-native-gesture-handler";

const DisplayBarTransaction = ({ transaction }) => {
  return (
    <View style={transaction.category[0]?.type === "Expense" || transaction.subCategory[0]?.type === "Expense" ? styles.containerRed : styles.containerGreen}>
      <View style={styles.rectButton}>
        <View style={styles.iconTitle}>
          {transaction.category.length > 0 ? (
            <View style={styles.iconTitle}>
              <Icon name={transaction.category[0]?.icon} size={20} color={transaction.category[0]?.type === "Expense" ? "#CD3337" : "#33CD48"} type="MaterialIcons" />
              <Text style={styles.text}>{transaction.category[0]?.name}</Text>
            </View>
          ) : (
            <View style={styles.iconTitle}>
              <Icon name={transaction.subCategory[0]?.subcategories[0]?.icon} size={20} color={transaction.subCategory[0]?.type === "Expense" ? "#CD3337" : "#33CD48"} type="MaterialIcons" />
              <Text style={styles.text}>{transaction.subCategory[0]?.subcategories[0].name}</Text>
            </View>
          )}
        </View>
        <Text style={styles.text}>{transaction.amount} CAD</Text>
      </View>
    </View>
  );
};

export default DisplayBarTransaction;

const styles = StyleSheet.create({
  containerRed: {
    width: 350,
    backgroundColor: "#1A251D",
    borderRadius: 20,
    marginTop: 5,
    borderColor: "#CD3337",
    borderWidth: 1,
    borderRadius: 20,
  },
  containerGreen: {
    width: 350,
    backgroundColor: "#1A251D",
    borderRadius: 20,
    marginTop: 5,
    borderColor: "#33CD48",
    borderWidth: 1,
    borderRadius: 20,
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
