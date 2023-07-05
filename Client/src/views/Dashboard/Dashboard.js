import React, { useContext, useRef, useState } from "react";
import { StyleSheet, Text, View, Button, useColorScheme } from "react-native";
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
import { callAPI } from "../../utils/fetch/callAPI.js";

echarts.use([
  SVGRenderer,
  LineChart,
  PieChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
]);

const Dashboard = ({ navigation }) => {
  const { drawerIsOpen, setDrawerIsOpen } = useContext(DrawerContext);
  const theme = "dark"; //useColorScheme();
  const [chartData, setChartData] = useState([]);

  const skiaRef = useRef(null);
  option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
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
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,

        // data: [
        //   { value: 100, name: "test" },
        //   // { value: 1048, name: "Rent" },
        //   // { value: 735, name: "Utilities" },
        //   // { value: 580, name: "Transportation" },
        //   // { value: 484, name: "Groceries" },
        //   // { value: 300, name: "Entertainment" },
        // ],
      },
    ],
  };

  React.useEffect(() => {
    callAPI(
      "/api/transactions/agg/?startDate=2023-06-01&endDate=2023-06-30&accountId=649599fcc0e32768eca42c07",
      "GET",
      "",
      token
    )
      .then((res) => {
        // option.series[0].data = [{ value: 100, name: "test" }];
        setChartData(res);
        option.series[0].data = chartData;
      })
      .catch((error) => console.log("error", error));

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
  }, [chartData]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Dashboard",
      headerLeft: () => (
        <Icon
          name="filter-alt"
          type="MaterialIcons"
          color={"#33CD48"}
          onPress={() => {
            setDrawerIsOpen(!drawerIsOpen);
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <>
      <SkiaChart ref={skiaRef} />

      <View
        style={theme === "light" ? styles.containerLight : styles.containerDark}
      >
        <Text style={theme === "light" ? styles.textLight : styles.textDark}>
          Dashboard
        </Text>
        <Modal
          style={styles.modal}
          isVisible={drawerIsOpen}
          animationIn="slideInLeft"
          onSwipeComplete={() => setDrawerIsOpen(false)}
          swipeDirection="left"
          animationOut="slideOutLeft"
          onBackdropPress={() => setDrawerIsOpen(false)}
        >
          <View
            style={
              theme === "light"
                ? styles.modalContainerLight
                : styles.modalContainerDark
            }
          >
            <Text
              style={theme === "light" ? styles.textLight : styles.textDark}
            >
              I am the modal content!
            </Text>
            <Button
              title="Hide modal"
              onPress={() => {
                setDrawerIsOpen(false);
              }}
            />
          </View>
        </Modal>
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
  modal: { margin: 0 },
  modalContainerLight: {
    backgroundColor: colors.light.lightBlue,
    width: "60%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainerDark: {
    backgroundColor: colors.dark.black,
    width: "60%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
