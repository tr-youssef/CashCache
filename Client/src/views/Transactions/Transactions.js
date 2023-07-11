import React, { useContext, useEffect, useCallback, useState } from "react";
import { StyleSheet, SectionList, View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { PlaidContext } from "../../utils/context/PlaidContext.js";
import { Icon } from "@rneui/themed";
import { callAPI } from "../../utils/fetch/callAPI.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import { TransactionsContext } from "../../utils/context/TransactionsContext.js";
import DisplayBarTransaction from "../../components/DisplayBar/DisplayBarTransaction.js";
import Swipe from "../../components/Swipe/Swipe.js";
import AddButton from "../../components/AddButton/AddButton.js";
import moment from "moment";

const Transactions = ({ navigation }) => {
  const isFocused = useIsFocused();
  const plaidContext = useContext(PlaidContext);
  const transactionContext = useContext(TransactionsContext);
  const { transactions, setTransactions } = transactionContext;
  const [selectTransactions, setSelectTransactions] = useState(transactions);
  const [search, setSearch] = useState("");
  const { linkToken, setLinkToken, accessToken } = plaidContext;

  const Row = ({ item, editAction, deleteAction }) => <DisplayBarTransaction key={item._id} transaction={item} type="transactions" editAction={editAction} deleteAction={deleteAction} />;
  const SwipeableRow = ({ items, index, deleteAction, editAction }) => {
    return items.map((item) => {
      return (
        <Swipe editAction={() => editAction(item)} deleteAction={() => deleteAction(item._id)} key={item._id}>
          <Row item={item} key={index} />
        </Swipe>
      );
    });
  };
  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.text}>{moment(section.date).format("MMM D, YYYY")}</Text>
      <Text style={styles.text}>{section.sum.toFixed(2)} CAD</Text>
    </View>
  );
  const transactionsByDate = selectTransactions.reduce((acc, transaction) => {
    const date = transaction._id;
    let sum = 0;
    transaction?.transaction.forEach((element) => {
      sum += element.amount;
    });
    if (acc[date]) {
      acc[date].data.push(transaction);
    } else {
      if (transaction.transaction.length > 0) acc[date] = { date, sum, data: [transaction] };
    }
    return acc;
  }, {});

  const sections = Object.values(transactionsByDate);

  const createLinkToken = useCallback(async () => {
    callAPI("/api/plaid/generate_link_token", "POST", {}, token)
      .then((res) => setLinkToken(res.link_token))
      .catch((error) => console.log("error", error));
  }, [setLinkToken]);

  useEffect(() => {
    if (linkToken == null) {
      createLinkToken();
    }
  }, [linkToken]);

  useEffect(() => {
    callAPI("/api/transactions", "GET", "", token)
      .then((res) => setTransactions(res))
      .catch((error) => console.log("error", error));
  }, [isFocused]);

  useEffect(() => {
    setSelectTransactions(
      transactions.map(({ _id, transaction }) => ({
        _id,
        transaction: transaction.filter(
          ({ amount, category, subCategory }) => amount.toString().includes(search) || category[0]?.name?.toLowerCase().includes(search.toLowerCase()) || subCategory[0]?.subcategories[0]?.name?.toLowerCase().includes(search.toLowerCase())
        ),
      }))
    );
  }, [transactions, search]);

  const deleteAction = (idTransaction) => {
    callAPI(`/api/transactions/${idTransaction}`, "DELETE", {}, token)
      .then(async (res) => {
        await callAPI("/api/transactions", "GET", "", token).then((res) => setTransactions(res));
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };
  const editAction = (transaction) => {
    navigation.navigate("EditTransaction", {
      transaction: transaction,
    });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Transactions",
      headerLeft: () => (
        <Icon
          name="sync"
          type="MaterialIcons"
          color={"#33CD48"}
          onPress={() => {
            accessToken ? alert("test") : navigation.navigate("Plaid");
          }}
        />
      ),
    });
  }, [navigation, linkToken]);
  return (
    <View style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} />
      <SectionList
        sections={sections}
        renderItem={({ item, index }) => <SwipeableRow items={item.transaction} key={item._id} index={index} editAction={editAction} deleteAction={deleteAction} />}
        keyExtractor={(item) => item._id}
        renderSectionHeader={renderSectionHeader}
      />
      <AddButton screen={"AddTransaction"} />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A05",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    color: "#F2FFF5",
    fontWeight: "bold",
  },
});
