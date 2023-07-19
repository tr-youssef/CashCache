import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

const Input = ({
  label,
  placeholder,
  datalist = "",
  date = "",
  setDate,
  value,
  setValue,
  disabled,
  line = 1,
  keyboardType = "default",
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      {datalist ? (
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={datalist}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      ) : date ? (
        <TouchableOpacity
          onPress={() => {
            setShow(true);
          }}
          style={styles.touchable}
        >
          <View pointerEvents="none">
            <TextInput
              value={date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
              placeholder={placeholder}
              placeholderTextColor="#888"
              editable={false}
              style={styles.date}
            />
          </View>
        </TouchableOpacity>
      ) : disabled ? (
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#888"
          style={styles.disabledInput}
          editable={false}
          selectTextOnFocus={false}
        />
      ) : line > 1 ? (
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#888"
          style={styles.inputMultiLine}
          onChangeText={(text) => setValue(text)}
          multiline
          numberOfLines={line}
        />
      ) : (
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#888"
          keyboardType={keyboardType}
          style={styles.input}
          onChangeText={(text) => setValue(text)}
        />
      )}

      <Modal
        style={styles.modal}
        isVisible={show}
        animationIn="slideInLeft"
        onSwipeComplete={() => setShow(false)}
        swipeDirection="left"
        animationOut="slideOutLeft"
        onBackdropPress={() => setShow(false)}
      >
        <View style={styles.modalContainerDark}>
          <DateTimePicker
            testID="dateTimePicker"
            mode="date"
            value={date}
            display="spinner"
            onChange={onChange}
            themeVariant="dark"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 25,
    justifyContent: "space-between",
  },
  text: {
    color: "#F2FFF5",
  },
  touchable: {
    width: "60%",
    backgroundColor: "#1A251D",
    height: 30,
    borderRadius: 10,
  },
  date: {
    width: "100%",
    color: "#F2FFF5",
    backgroundColor: "#1A251D",
    height: 30,
    borderRadius: 10,
    paddingLeft: 15,
    borderColor: "#33CD48",
    borderWidth: 1,
  },
  input: {
    width: "60%",
    color: "#F2FFF5",
    backgroundColor: "#1A251D",
    height: 30,
    borderRadius: 10,
    paddingLeft: 15,
    borderColor: "#33CD48",
    borderWidth: 1,
  },
  inputMultiLine: {
    height: 100,
    width: "60%",
    color: "#F2FFF5",
    backgroundColor: "#1A251D",
    borderRadius: 10,
    paddingLeft: 15,
    borderColor: "#33CD48",
    borderWidth: 1,
  },
  disabledInput: {
    width: "60%",
    color: "#F2FFF5",
    backgroundColor: "#808080",
    opacity: 0.4,
    height: 30,
    borderRadius: 10,
    paddingLeft: 15,
  },
  dropdown: {
    width: "60%",
    color: "#F2FFF5",
    backgroundColor: "#1A251D",
    height: 30,
    borderRadius: 10,
    borderColor: "#33CD48",
    borderWidth: 1,
    paddingRight: 5,
  },
  placeholderStyle: { color: "#F2FFF5" },
  selectedTextStyle: {
    backgroundColor: "#1A251D",
    color: "#F2FFF5",
    marginLeft: 15,
  },
  modalContainerDark: {
    backgroundColor: "#1A251D",
    width: "100%",
    height: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});

export default Input;
