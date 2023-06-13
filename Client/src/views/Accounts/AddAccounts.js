import { StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Icon } from "@rneui/themed";
import Input from "../../components/Input/Input.js";
import IconsSelector from "../../components/IconsSelector/IconsSelector.js";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { useState } from "react";
import { CategoriesContext } from "../../utils/context/CategoriesContext.js";
import Card from "../../components/Card/Card.js";

const AddAccount = ({ navigation }) => {
  // const categoryContext = useContext(CategoriesContext);
  // const { setCategories } = categoryContext;
  //   const data = [
  //     { label: "Expense", value: "Expense" },
  //     { label: "Income", value: "Income" },
  //     { label: "Transfer", value: "Transfer" },
  //   ];
  // const icons = ["fastfood", "home", "local-movies", "airplanemode-active", "payments", "compare-arrows"];
  // const [choiceCategory, setChoiceCategory] = useState(icons[0]);
  const [name, setName] = useState("");
  const [initialAmount, setInitialAmount] = useState(0);

  const saveCategory = (name, type, choiceCategory) => {
    callAPI("/api/categories/parent", "POST", { name: name, type: type, icon: choiceCategory }, token)
      .then(async () => {
        await callAPI("/api/categories/parents", "GET", "", token).then((res) => setCategories(res));
        navigation.navigate("Categories");
      })
      .catch((error) => {
        console.error("Error saving category:", error);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Account",
      headerRight: () => <Icon name="save" type="MaterialIcons" color={"#33CD48"} onPress={() => saveAccounts(name, initialAmount)} />,
    });
  }, [navigation, name, initialAmount]);

  return (
    <View style={styles.container}>
      <Input label={"Name :"} value={name} setValue={setName} />
      <Input label={"Initial amount :"} value={initialAmount.toString()} setValue={setInitialAmount} />
      <Card name={name} initialAmount={initialAmount} />
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

export default AddAccount;
