import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { callAPI } from "../../utils/fetch/callAPI.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../utils/theme/theme.js";
import { Dimensions } from "react-native";
import ExpensesByCategoryChart from "../../components/Charts/ExpensesByCategoryChart.js";
import ExpenseTrendChart from "../../components/Charts/ExpenseTrendChart";

const Dashboard = ({ navigation }) => {
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date(endDate.getFullYear(), endDate.getMonth(), 1));
  const numHistoricalExpenseTrendMonths = 4;
  const localeToUse = "en-CA";
  const [expenseTrendData, setExpenseTrendData] = useState({ amounts: [], monthNames: [] });
  const [expensesByCategoryData, setExpensesByCategoryData] = useState([]);

  const getExpenseTrendStartDate = () => {
    const dt = new Date(startDate);
    dt.setMonth(dt.getMonth() - numHistoricalExpenseTrendMonths);
    dt.setDate(1);
    return dt;
  };

  const LoadExpenseTrend = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const res = await callAPI(`/api/transactions/agg/expense_trend/?startDate=${getExpenseTrendStartDate()}&endDate=${endDate}`, "GET", {}, token);
        if (res && res.length > 0) {
          const amounts = [];
          const monthNames = [];
          res.forEach((element) => {
            const dt = new Date();
            dt.setFullYear(element.year);
            dt.setHours(0, 0, 0, 0);
            dt.setMonth(element.month, 1);
            monthNames.push(dt.toLocaleString(localeToUse, { month: "short" }));
            amounts.push(element.amount);
          });

          return { amounts, monthNames };
        }
      }
    } catch (error) {
      console.log("error", error);
    }
    return { amounts: [], monthNames: [] };
  };

  const LoadExpensesByCategory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const res = await callAPI(`/api/transactions/agg/expenses_by_category/?startDate=${startDate}&endDate=${endDate}`, "GET", {}, token);
        if (res && res.length > 0) {
          const expensesByCategoryData = res.map((item) => ({
            category: item.name,
            amount: item.value,
          }));
          return expensesByCategoryData;
        }
      }
    } catch (error) {
      console.log("error loading ExpensesByCategory", error);
    }
    return [];
  };

  useEffect(() => {
    const LoadAllCharts = async () => {
      const expenseTrendData = await LoadExpenseTrend();
      const expensesByCategoryData = await LoadExpensesByCategory();
      setExpenseTrendData(expenseTrendData);
      setExpensesByCategoryData(expensesByCategoryData);
    };

    LoadAllCharts();
    const unsubscribe = navigation.addListener("focus", LoadAllCharts);

    return () => {
      unsubscribe();
    };
  }, [startDate, endDate, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerDark} bounces={true}>
        <ExpensesByCategoryChart data={expensesByCategoryData} />

        <ExpenseTrendChart data={expenseTrendData} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.black,
  },
  containerDark: {
    backgroundColor: colors.dark.black,
    alignItems: "center",
    paddingBottom: 20,
  },
  dateRangeContainer: {
    width: "100%",
    alignItems: "center",
  },
  dateRange: {
    color: "white",
    fontWeight: "normal",
  },
});

export default Dashboard;
