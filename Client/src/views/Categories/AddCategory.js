import { StyleSheet, Text, View } from "react-native";
import Input from "../../components/Input/Input.js";
import IconsSelector from "../../components/IconsSelector/IconsSelector.js";

const AddCategory = ({ icons, name, setName, data, type, setType, choice, setChoice }) => {
  return (
    <View style={styles.container}>
      <Input label={"Name :"} value={name} setValue={setName} />
      <Input label={"Type :"} datalist={data} value={type} setValue={setType} />
      <IconsSelector choice={choice} setChoice={setChoice} icons={icons} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    alignItems: "center",
  },
});

export default AddCategory;
