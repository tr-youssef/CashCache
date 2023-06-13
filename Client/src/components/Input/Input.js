import { StyleSheet, Text, View, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

const Input = ({ label, placeholder, datalist = "", value, setValue, disabled }) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      {datalist ? (
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
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
      ) : disabled ? (
        <TextInput value={value} placeholder={placeholder} placeholderTextColor="#888" style={styles.disabledInput} editable={false} selectTextOnFocus={false} />
      ) : (
        <TextInput value={value} placeholder={placeholder} placeholderTextColor="#888" style={styles.input} onChangeText={(text) => setValue(text)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "6%",
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
  input: { width: "60%", color: "#F2FFF5", backgroundColor: "#1A251D", height: "100%", borderRadius: 10, paddingLeft: 15 },
  disabledInput: { width: "60%", color: "#F2FFF5", backgroundColor: "#808080", opacity: 0.4, height: "100%", borderRadius: 10, paddingLeft: 15 },
  dropdown: { width: "60%", color: "#F2FFF5", backgroundColor: "#1A251D", height: "100%", borderRadius: "10" },
  placeholderStyle: { color: "#F2FFF5" },
  selectedTextStyle: { backgroundColor: "#1A251D", color: "#F2FFF5", marginLeft: 15 },
});

export default Input;
