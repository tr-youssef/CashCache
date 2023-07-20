import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SkiaChart, SVGRenderer } from "@wuba/react-native-echarts";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";

echarts.use([SVGRenderer, BarChart, GridComponent, LegendComponent, TooltipComponent]);

const ExpenseTrendChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  function currencyFormatter(data) {
    data = parseFloat(data);
    return data.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
  }
  useEffect(() => {
    if (chartRef.current) {
      let option = {
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
            data: data.monthNames,
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
            type: "bar",
            data: data.amounts,
            itemStyle: {
              color: "#33CD48",
            },
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
      <Text style={styles.chartTitle}>Expenses by Month</Text>
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
    marginTop: 20,
  },
  chart: {
    width: "100%",
    height: 250,
  },
});

export default ExpenseTrendChart;
