import { StyleSheet, View, Pressable, Text } from "react-native";
import React, { useState } from "react";

const Switch = ({ type, setType, disabled }) => {
  const [choice, setChoice] = useState(type);

  const handlePress = (selectedType) => {
    setChoice(selectedType);
    setType(selectedType);
  };
  if (disabled)
    return (
      <View style={styles.container}>
        <View
          style={
            choice === "Expense"
              ? [styles.selectDisabledButton, styles.button, styles.buttonFirst]
              : [styles.button, styles.buttonFirst]
          }
        >
          <Text style={styles.text}>Expense</Text>
        </View>
        <View
          style={
            choice === "Income"
              ? [styles.selectDisabledButton, styles.button]
              : styles.button
          }
        >
          <Text style={styles.text}>Income</Text>
        </View>
        <View
          style={
            choice === "Transfer"
              ? [styles.selectDisabledButton, styles.button, styles.buttonLast]
              : [styles.button, styles.buttonLast]
          }
        >
          <Text style={styles.text}>Transfer</Text>
        </View>
      </View>
    );
  return (
    <View style={styles.container}>
      <Pressable
        style={
          choice === "Expense"
            ? [styles.selectButton, styles.button, styles.buttonFirst]
            : [styles.button, styles.buttonFirst]
        }
        onPress={() => handlePress("Expense")}
      >
        <Text style={styles.text}>Expense</Text>
      </Pressable>
      <Pressable
        style={
          choice === "Income"
            ? [styles.selectButton, styles.button]
            : styles.button
        }
        onPress={() => handlePress("Income")}
      >
        <Text style={styles.text}>Income</Text>
      </Pressable>
      <Pressable
        style={
          choice === "Transfer"
            ? [styles.selectButton, styles.button, styles.buttonLast]
            : [styles.button, styles.buttonLast]
        }
        onPress={() => handlePress("Transfer")}
      >
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
    borderRadius: 20,
  },
  button: { flex: 1, justifyContent: "center", alignItems: "center" },
  selectButton: { backgroundColor: "#33CD48" },
  selectDisabledButton: { backgroundColor: "#808080", opacity: 0.4 },
  buttonFirst: { borderTopLeftRadius: 20, borderBottomLeftRadius: 20 },
  buttonLast: { borderTopRightRadius: 20, borderBottomRightRadius: 20 },
  text: { color: "#F2FFF5" },
});
