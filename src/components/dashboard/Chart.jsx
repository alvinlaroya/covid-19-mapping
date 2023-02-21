import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

// redux
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  style: {
    borderRadius: 16,
  },
};

const Chart = () => {
  const { cases } = useSelector((state) => state.userReducer);

  const data = {
    labels: cases.map((data) => data.barangay),
    datasets: [
      {
        data: cases.map((data) => data.new),
        color: (opacity = 1) => `rgba(25, 130, 70, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: cases.map((data) => data.recovery),
        color: (opacity = 1) => `rgba(168, 145, 29, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: cases.map((data) => data.death),
        color: (opacity = 1) => `rgba(130, 14, 14, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.title, { color: "black" }]}>Chart of cases</Text>
        {cases.length > 0 ? (
          <LineChart
            style={{ marginTop: 10 }}
            data={data}
            width={screenWidth - 70}
            height={200}
            chartConfig={chartConfig}
            bezier
          />
        ) : (
          <Text>Loading Chart</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 5,
  },

  card: {
    elevation: 3,
    height: "auto",
    width: "100%",
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
  },

  title: {
    fontSize: 23,
    fontWeight: "bold",
  },
});

export default Chart;
