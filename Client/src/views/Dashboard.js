import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { callAPI } from "../utils/fetch/callAPI.js";

const Dashboard = ({ navigation }) => {
  const [test, setTest] = useState("");
  useEffect(() => {
    callAPI("http://localhost:4001/api/test", "GET", "", "").then((res) => setTest(res.message));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Dashboardd</Text>
      <Text>{test}</Text>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
