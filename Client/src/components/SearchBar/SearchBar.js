import { View, TextInput, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";

const SearchBar = ({ search, setSearch }) => {
  const handleChange = (text) => {
    setSearch(text);
  };
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#888" type="MaterialIcons" />
      <TextInput
        value={search}
        placeholder="Search"
        placeholderTextColor="#888"
        style={styles.input}
        onChangeText={(text) => handleChange(text)} // You can add your own logic here
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "5%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A251D",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 15,
    borderColor: "#33CD48",
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#F2FFF5",
  },
});

export default SearchBar;
