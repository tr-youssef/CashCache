import { useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Icon } from "@rneui/themed";
import { RectButton, Swipeable } from "react-native-gesture-handler";

const Swipe = ({ children, editAction, deleteAction }) => {
  const swipeableRowRef = useRef(null);
  const renderRightAction = (text, color, isLeft, action) => {
    const pressHandler = () => {
      action();
      swipeableRowRef.current.close();
    };
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton style={styles.actionWrapper} onPress={pressHandler}>
          <View style={[isLeft ? styles.leftAction : styles.rightAction, { backgroundColor: color }]}>
            <Icon name={text} size={20} color="#F2FFF5" type="MaterialIcons" />
          </View>
        </RectButton>
      </Animated.View>
    );
  };
  const renderRightActions = ({ editAction, deleteAction }) => (
    <View style={{ width: 100, height: 40, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
      {renderRightAction("edit", "#ffab00", true, editAction)}
      {renderRightAction("delete", "#dd2c00", false, deleteAction)}
    </View>
  );
  return (
    <Swipeable ref={swipeableRowRef} friction={2} leftThreshold={30} rightThreshold={40} renderRightActions={() => renderRightActions({ editAction, deleteAction })}>
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
  },
  rightAction: {
    width: 50,
    backgroundColor: "#1A251D",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 5,
    paddingLeft: 5,
  },
  leftAction: {
    width: 50,
    backgroundColor: "#1A251D",
    paddingVertical: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingLeft: 10,
  },
});

export default Swipe;
