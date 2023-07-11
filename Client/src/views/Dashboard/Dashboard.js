import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SkiaChart, SVGRenderer } from "@wuba/react-native-echarts";
import { callAPI } from "../../utils/fetch/callAPI.js";
import { colors } from "../../utils/theme/theme.js";
import * as echarts from "echarts/core";
import { LineChart, PieChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

echarts.use([SVGRenderer, LineChart, PieChart, GridComponent, LegendComponent, TooltipComponent]);

const Dashboard = ({ navigation }) => {
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date(endDate.getFullYear(), endDate.getMonth(), 1));
  const skiaRef = useRef(null);
  const chartInstanceRef = useRef(null);

  function currencyFormatter(data) {
    data = parseFloat(data);
    return data.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
  }

  const option = {
    backgroundColor: styles.containerDark.backgroundColor,
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        var val = currencyFormatter(params.value);
        return val;
      },
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
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
            fontSize: 20,
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

  const LoadPieChartData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await callAPI(`/api/transactions/agg?startDate=${startDate}&endDate=${endDate}`, "GET", {}, token)
          .then((res) => {
            option.series[0].data = res;
            if (chartInstanceRef.current) {
              chartInstanceRef.current.setOption(option);
            }
          })
          .catch((error) => console.log("error", error));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    LoadPieChartData();
    navigation.addListener("focus", LoadPieChartData);
  }, [startDate, endDate, navigation]);

  useEffect(() => {
    if (skiaRef.current && !chartInstanceRef.current) {
      chartInstanceRef.current = echarts.init(skiaRef.current, "dark", {
        renderer: "svg",
        width: 400,
        height: 400,
      });
      chartInstanceRef.current.setOption(option);
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <View style={styles.containerDark}>
      <SkiaChart ref={skiaRef} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: colors.dark.black,
    alignItems: "center",
    justifyContent: "center",
  },
});
