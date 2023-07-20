import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SkiaChart, SVGRenderer } from "@wuba/react-native-echarts";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { colors } from "../../utils/theme/theme.js";
import * as echarts from "echarts/core";
import { LineChart, PieChart, BarChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

echarts.use([SVGRenderer, LineChart, PieChart, BarChart, GridComponent, LegendComponent, TooltipComponent]);

const Dashboard = ({ navigation }) => {
  const ExpensesByCategoryRef = useRef(null);
  const ExpensesTrendRef = useRef(null);

  const ExpenseByCategoryChartInstanceRef = useRef(null);
  const ExpenseTrendChartInstanceRef = useRef(null);
  let dt = new Date();
  dt.setHours(23, 59, 59, 999);
  const [endDate, setEndDate] = useState(dt);
  dt = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  dt.setHours(0, 0, 0, 0);
  const [startDate, setStartDate] = useState(dt);
  const numHistoricalExpenseTrendMonths = 4;
  const localeToUse = "en-CA";

  function currencyFormatter(data) {
    data = parseFloat(data);
    return data.toLocaleString(localeToUse, { style: "currency", currency: "CAD" });
  }

  let optionExpenseTrend = {
    backgroundColor: "#1A251D",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      valueFormatter: currencyFormatter,
    },
    grid: {
      left: "13%",
      right: "14%",
      bottom: "13%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["Feb", "Mar", "Apr", "May", "June", "July"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Expenses",
        type: "bar",
        barWidth: "60%",
        data: [52, 200, 334, 390, 330, 220],
      },
    ],
  };

  const optionExpensesByCategory = {
    backgroundColor: "#1A251D",
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        var val = currencyFormatter(params.value);
        return val;
      },
    },
    legend: {
      top: "2%",
      left: "center",
    },
    series: [
      {
        type: "pie",
        radius: ["30%", "60%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "left",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [],
      },
    ],
  };

  function getExpenseTrendStartDate() {
    let dt = new Date(startDate);
    dt.setMonth(dt.getMonth() - numHistoricalExpenseTrendMonths);
    dt.setDate(1);
    return dt;
  }

  const LoadExpenseTrend = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await callAPI(`/api/transactions/agg/expense_trend/?startDate=${getExpenseTrendStartDate()}&endDate=${endDate}`, "GET", {}, token)
          .then((res) => {
            if (ExpenseTrendChartInstanceRef.current) {
              let Amounts = [];
              let monthNames = [];
              res.forEach((element) => {
                let dt = new Date();
                dt.setFullYear(element.year);
                dt.setHours(0, 0, 0, 0);
                dt.setMonth(element.month, 1);
                monthNames.push(dt.toLocaleString(localeToUse, { month: "short" }));

                Amounts.push(element.amount);
              });

              optionExpenseTrend.xAxis[0].data = monthNames;
              optionExpenseTrend.series[0].data = Amounts;
              ExpenseTrendChartInstanceRef.current.setOption(optionExpenseTrend);
            }
          })
          .catch((error) => console.log("error", error));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const LoadExpensesByCategory = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await callAPI(`/api/transactions/agg/expenses_by_category/?startDate=${startDate}&endDate=${endDate}`, "GET", {}, token)
          .then((res) => {
            optionExpensesByCategory.series[0].data = res;
            if (ExpenseByCategoryChartInstanceRef.current) {
              ExpenseByCategoryChartInstanceRef.current.setOption(optionExpensesByCategory);
            }
          })
          .catch((error) => console.log("error loading ExpensesByCategory", error));
      }
    } catch (error) {
      console.log("error loading ExpensesByCategory", error);
    }
  };

  useEffect(() => {
    if (ExpensesByCategoryRef.current && !ExpenseByCategoryChartInstanceRef.current) {
      ExpenseByCategoryChartInstanceRef.current = echarts.init(ExpensesByCategoryRef.current, "dark", {
        renderer: "svg",
        width: 350,
        height: 250,
      });
      ExpenseByCategoryChartInstanceRef.current.setOption(optionExpensesByCategory);
    }

    return () => {
      if (ExpenseByCategoryChartInstanceRef.current) {
        ExpenseByCategoryChartInstanceRef.current.dispose();
        ExpenseByCategoryChartInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (ExpensesTrendRef.current && !ExpenseTrendChartInstanceRef.current) {
      ExpenseTrendChartInstanceRef.current = echarts.init(ExpensesTrendRef.current, "dark", {
        renderer: "svg",
        width: 350,
        height: 250,
      });
      ExpenseTrendChartInstanceRef.current.setOption(optionExpenseTrend);
    }

    return () => {
      if (ExpenseTrendChartInstanceRef.current) {
        ExpenseTrendChartInstanceRef.current.dispose();
        ExpenseTrendChartInstanceRef.current = null;
      }
    };
  }, []);

  const LoadAllCharts = () => {
    getExpenseTrendStartDate();
    LoadExpensesByCategory();
    LoadExpenseTrend();
  };

  useEffect(() => {
    LoadAllCharts;
    navigation.addListener("focus", LoadAllCharts);
  }, [startDate, endDate, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.containerDark} bounces={true}>
      <View style={styles.box}>
        <Text style={styles.chartTitle}> Expenses By Category </Text>
        <Text style={styles.dateRange}>{`${startDate.toLocaleDateString(localeToUse)} - ${endDate.toLocaleDateString(localeToUse)}`}</Text>
        <SkiaChart style={styles.chart} ref={ExpensesByCategoryRef} />
      </View>
      <View style={styles.box}>
        <Text style={styles.chartTitle}> Expenses Trend </Text>
        <SkiaChart style={styles.chart} ref={ExpensesTrendRef} />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  containerDark: {
    height: Dimensions.get("window").height + 150,
    backgroundColor: colors.dark.black,
    alignItems: "center",
  },
  box: {
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#1A251D",
    borderColor: "#33CD48",
    width: "95%",
    borderRadius: 20,
    padding: 10,
    marginVertical: 20,
  },
  chartTitle: {
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },
  dateRange: {
    color: "white",
    fontWeight: "normal",
  },
});
