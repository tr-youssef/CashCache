import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { DrawerContext } from "../../utils/context/DrawerContext.js";
import Modal from "react-native-modal";

const Dashboard = () => {
  const [test, setTest] = useState("");
  const { drawerIsOpen, setDrawerIsOpen } = useContext(DrawerContext);

  useEffect(() => {
    callAPI("http://localhost:4001/api/test", "GET", "", "").then((res) => setTest(res.message));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Dashboardd</Text>
      <Text>{test}</Text>
      <Text>{drawerIsOpen}</Text>
      <Modal style={styles.modal} isVisible={drawerIsOpen} animationIn="slideInLeft" onSwipeComplete={() => setDrawerIsOpen(false)} swipeDirection="left" animationOut="slideOutLeft" onBackdropPress={() => setDrawerIsOpen(false)}>
        <View style={styles.modalContainer}>
          <Text>I am the modal content!</Text>
          <Button
            title="Hide modal"
            onPress={() => {
              setDrawerIsOpen(false);
            }}
          />
        </View>
      </Modal>
      <Button style={[styles.button, styles.buttonOpen]} onPress={() => setDrawerIsOpen(true)} title="Show Modal" />
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
  modal: { margin: 0 },
  modalContainer: {
    backgroundColor: "white",
    width: "60%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
