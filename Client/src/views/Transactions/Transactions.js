import React, { useContext, useEffect, useCallback, useState } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { PlaidContext } from "../../utils/context/PlaidContext.js";
import { Icon } from "@rneui/themed";
import { callAPI } from "../../utils/fetch/callAPI.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import { TransactionsContext } from "../../utils/context/TransactionsContext.js";
import DisplayBarTransaction from "../../components/DisplayBar/DisplayBarTransaction.js";
import Swipe from "../../components/Swipe/Swipe.js";

const Transactions = ({ navigation }) => {
  const plaidContext = useContext(PlaidContext);
  const transactionContext = useContext(TransactionsContext);
  const { transactions, setTransactions } = transactionContext;
  const [selectTransactions, setSelectTransactions] = useState(transactions);
  const [search, setSearch] = useState("");
  const { linkToken, setLinkToken } = plaidContext;

  const Row = ({ item, editAction, deleteAction }) => <DisplayBarTransaction key={item._id} transaction={item} type="transactions" editAction={editAction} deleteAction={deleteAction} />;
  const SwipeableRow = ({ items, index, deleteAction, editAction }) => {
    return items.map((item) => {
      return (
        <Swipe editAction={editAction} deleteAction={deleteAction} key={item._id}>
          <Row item={item} key={index} />
        </Swipe>
      );
    });
  };

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
  }, []);

  useEffect(() => {
    setSelectTransactions(
      transactions.map(({ _id, transaction }) => ({
        _id,
        transaction: transaction.filter(({ amount }) => amount !== "" && amount.toString().includes(search)),
      }))
    );
  }, [transactions, search]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Transactions",
      headerLeft: () => (
        <Icon
          name="sync"
          type="MaterialIcons"
          color={"#33CD48"}
          onPress={() => {
            navigation.navigate("Plaid");
          }}
        />
      ),
    });
  }, [navigation, linkToken]);
  return (
    <View style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} />
      <FlatList
        data={selectTransactions}
        renderItem={({ item, index }) => <SwipeableRow items={item.transaction} key={item._id} index={index} editAction={() => editAction(item)} deleteAction={() => deleteAction(item._id)} />}
        keyExtractor={(item) => item._id}
      />
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
});
