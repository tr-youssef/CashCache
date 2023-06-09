import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button, useColorScheme } from "react-native";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { DrawerContext } from "../../utils/context/DrawerContext.js";
import Modal from "react-native-modal";
import { colors } from "../../utils/theme/theme.js";

const Dashboard = () => {
  const [test, setTest] = useState("");
  const { drawerIsOpen, setDrawerIsOpen } = useContext(DrawerContext);
  const theme = "light"; //useColorScheme();

  useEffect(() => {
    callAPI("/api/test", "GET", "", "").then((res) => setTest(res.message));
  }, []);

  return (
    <View
      style={theme === "light" ? styles.containerLight : styles.containerDark}
    >
      <Text style={theme === "light" ? styles.textLight : styles.textDark}>
        Dashboardd
      </Text>
      <Text style={theme === "light" ? styles.textLight : styles.textDark}>
        {test}
      </Text>
      <Modal
        style={styles.modal}
        isVisible={drawerIsOpen}
        animationIn="slideInLeft"
        onSwipeComplete={() => setDrawerIsOpen(false)}
        swipeDirection="left"
        animationOut="slideOutLeft"
        onBackdropPress={() => setDrawerIsOpen(false)}
      >
        <View
          style={
            theme === "light"
              ? styles.modalContainerLight
              : styles.modalContainerDark
          }
        >
          <Text style={theme === "light" ? styles.textLight : styles.textDark}>
            I am the modal content!
          </Text>
          <Button
            title="Hide modal"
            onPress={() => {
              setDrawerIsOpen(false);
            }}
          />
        </View>
      </Modal>
      <Button
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setDrawerIsOpen(true)}
        title="Show Modal"
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: colors.light.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDark: {
    flex: 1,
    backgroundColor: colors.dark.black,
    alignItems: "center",
    justifyContent: "center",
  },
  textLight: {
    color: colors.light.black,
  },
  textDark: {
    color: colors.dark.white,
  },
  modal: { margin: 0 },
  modalContainerLight: {
    backgroundColor: colors.light.lightBlue,
    width: "60%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainerDark: {
    backgroundColor: colors.dark.black,
    width: "60%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
