import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SkiaChart, SVGRenderer } from "@wuba/react-native-echarts";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { LegendComponent, TooltipComponent } from "echarts/components";
import { currencyFormatter } from "../../utils/localization.js";

echarts.use([SVGRenderer, PieChart, LegendComponent, TooltipComponent]);

const ExpensesByCategoryChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const option = {
        backgroundColor: "#1A251D",
        tooltip: {
          trigger: "item",
          formatter: function (params) {
            var val = currencyFormatter(params.value);
            return val;
          },
        },
        legend: {
          top: "90%",
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
              show: true,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            labelLine: {
              show: false,
            },
            data: data.map((item) => ({
              name: item.category,
              value: item.amount,
            })),
          },
        ],
      };

      chartInstance.current = echarts.init(chartRef.current, "dark", {
        renderer: "svg",
        width: 350,
        height: 250,
      });

      chartInstance.current.setOption(option);

      return () => {
        if (chartInstance.current) {
          chartInstance.current.dispose();
          chartInstance.current = null;
        }
      };
    }
  }, [data]);

  return (
    <View style={styles.box}>
      <Text style={styles.chartTitle}>Expenses By Category</Text>
      <Text style={styles.chartTitle}>{Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date())}</Text>
      <SkiaChart style={styles.chart} ref={chartRef} />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 10,
  },
  chart: {
    width: "100%",
    height: 250,
  },
});

export default ExpensesByCategoryChart;
