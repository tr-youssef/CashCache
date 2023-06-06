import { StyleSheet, View, Pressable, Text } from "react-native";
import React, { useState } from "react";

const Switch = ({ type, setType }) => {
  const [choice, setChoice] = useState(type);

  const handlePress = (selectedType) => {
    setChoice(selectedType);
    setType(selectedType);
  };
  return (
    <View style={styles.container}>
      <Pressable style={choice === "Expense" ? styles.selectButtonFirst : styles.buttonFirst} onPress={() => handlePress("Expense")}>
        <Text style={styles.text}>Expense</Text>
      </Pressable>
      <Pressable style={choice === "Income" ? styles.selectButton : styles.button} onPress={() => handlePress("Income")}>
        <Text style={styles.text}>Income</Text>
      </Pressable>
      <Pressable style={choice === "Transfer" ? styles.selectButtonLast : styles.buttonLast} onPress={() => handlePress("Transfer")}>
        <Text style={styles.text}>Transfer</Text>
      </Pressable>
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    width: "70%",
    height: "5%",
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "#1A251D",
    resizeMode: "contain",
    borderRadius: "20%",
  },
  button: { flex: 1, justifyContent: "center", alignItems: "center" },
  selectButton: {
    backgroundColor: "#33CD48",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonFirst: { flex: 1, justifyContent: "center", alignItems: "center", borderTopLeftRadius: "20%", borderBottomLeftRadius: "20%" },
  selectButtonFirst: {
    backgroundColor: "#33CD48",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: "20%",
    borderBottomLeftRadius: "20%",
  },
  buttonLast: { flex: 1, justifyContent: "center", alignItems: "center", borderTopRightRadius: "20%", borderBottomRightRadius: "20%" },
  selectButtonLast: {
    backgroundColor: "#33CD48",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: "20%",
    borderBottomRightRadius: "20%",
  },
  text: {
    color: "#F2FFF5",
  },
});
