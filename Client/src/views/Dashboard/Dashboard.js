import React, { useContext, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  useColorScheme,
  ScrollViewBase,
} from "react-native";
import { DrawerContext } from "../../utils/context/DrawerContext.js";
import Modal from "react-native-modal";
import { colors } from "../../utils/theme/theme.js";
import { Icon } from "@rneui/themed";

import * as echarts from "echarts/core";
import { LineChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { SVGRenderer, SkiaChart } from "@wuba/react-native-echarts";
import { token, callAPI } from "../../utils/fetch/callAPI.js";
import { ScrollView } from "react-native-gesture-handler";

echarts.use([
  SVGRenderer,
  LineChart,
  PieChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
]);

const Dashboard = ({ navigation }) => {
  const theme = "dark"; //useColorScheme();
  const [chartData, setChartData] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  //todo - address date ranges spanning a year
  const [startDate, setStartDate] = useState(
    new Date(endDate.getFullYear(), endDate.getMonth(), 1)
  );

  function currencyFormatter(data) {
    data = parseFloat(data);
    return data.toLocaleString("en-CA", { style: "currency", currency: "CAD" });
  }

  const skiaRef = useRef(null);
  let option = {
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
        data: chartData,
      },
    ],
  };

  React.useEffect(() => {
    // if (token !== "" && token !== undefined) {
    callAPI(
      `/api/transactions/agg?startDate=${startDate}&endDate=${endDate}`,
      "GET"
    )
      .then((res) => {
        console.log("res", res);
        setChartData(res);
        console.log("chartData", chartData);
        option.series[0].data = res;
        let chart;
        if (skiaRef.current) {
          chart = echarts.init(
            skiaRef.current,
            theme === "light" ? "light" : "dark",
            {
              renderer: "svg",
              width: 400,
              height: 400,
            }
          );
          chart.setOption(option);
        }
        return () => chart?.dispose();
      })
      .catch((error) => console.log("error", error));
    // }
  }, [startDate, endDate]);

  return (
    <>
      {/* {token != "" && token != undefined && <SkiaChart ref={skiaRef} />} */}
      {/* chartData != [] && <SkiaChart ref={skiaRef} /> */}

      <View
        style={theme === "light" ? styles.containerLight : styles.containerDark}
      >
        <SkiaChart ref={skiaRef} />
      </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: colors.light.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDark: {
    flex: 1,
    backgroundColor: colors.dark.black,
    alignItems: "center",
    justifyContent: "center",
  },
  textLight: {
    color: colors.light.black,
  },
  textDark: {
    color: colors.dark.white,
  },
});
