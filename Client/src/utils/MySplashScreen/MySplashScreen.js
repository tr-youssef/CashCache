import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

export class MySplashScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>MySplashScreen</Text>
      </SafeAreaView>
    );
  }
}

export default MySplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {},
});
