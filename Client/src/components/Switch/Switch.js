import { StyleSheet, Button, View, Pressable, Text } from "react-native";
import React, { useState } from "react";

const Switch = () => {
  const [choice, setChoice] = useState("Expense");
  return (
    <View style={styles.container}>
      <Pressable style={choice === "Expense" ? styles.selectButton : styles.button} onPress={() => setChoice("Expense")}>
        <Text style={styles.text}>Expense</Text>
      </Pressable>
      <Pressable style={choice === "Income" ? styles.selectButton : styles.button} onPress={() => setChoice("Income")}>
        <Text style={styles.text}>Income</Text>
      </Pressable>
      <Pressable style={choice === "Transfer" ? styles.selectButton : styles.button} onPress={() => setChoice("Transfer")}>
        <Text style={styles.text}>Transfer</Text>
      </Pressable>
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
  },
  button: { borderColor: "#33CD48", borderWidth: "2px", width: "20%", height: "5%", justifyContent: "center", alignItems: "center" },
  selectButton: {
    backgroundColor: "#33CD48",
    width: "20%",
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
});
