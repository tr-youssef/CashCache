import React, { useContext, useEffect, useCallback, useState } from "react";
import { StyleSheet, SectionList, View, Text } from "react-native";
import { PlaidContext } from "../../utils/context/PlaidContext.js";
import { Icon } from "@rneui/themed";
import { callAPI } from "../../utils/fetch/callAPI.js";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import { TransactionsContext } from "../../utils/context/TransactionsContext.js";
import DisplayBarTransaction from "../../components/DisplayBar/DisplayBarTransaction.js";
import Swipe from "../../components/Swipe/Swipe.js";
import AddButton from "../../components/AddButton/AddButton.js";
import moment from "moment";

const ValidationTransactions = ({ route, navigation }) => {
  const { transactions } = route.params;

  const Row = ({ item, editAction, deleteAction }) => <DisplayBarTransaction key={item._id} transaction={item} type="transactions" editAction={editAction} deleteAction={deleteAction} />;
  const SwipeableRow = ({ items, index, deleteAction, editAction }) => {
    return items.map((item) => {
      return (
        <></>
        // <Swipe editAction={() => editAction(item)} deleteAction={() => deleteAction(item._id)} key={item._id}>
        //   <Row item={item} key={index} />
        // </Swipe>
      );
    });
  };
  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.text}>{section.account}</Text>
    </View>
  );
  const transactionsByAccount = transactions.reduce((acc, transaction) => {
    const account = transaction[0].accountId;
    if (acc[account]) {
      acc[account].data.push(transaction);
    } else {
      acc[account] = { account, data: [transaction] };
    }
    return acc;
  }, {});

  const sections = Object.values(transactionsByAccount);

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

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={({ item, index }) => <SwipeableRow items={item} key={item._id} index={index} editAction={editAction} deleteAction={deleteAction} />}
        keyExtractor={(item) => item._id}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  );
};

export default ValidationTransactions;

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
