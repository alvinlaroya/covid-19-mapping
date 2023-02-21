import React from "react";
import { StyleSheet, Text, View } from "react-native";

// redux
import { useSelector } from "react-redux";

const CaseMetrics = () => {
  const { newCases, recoveryCases, deathCases } = useSelector(
    (state) => state.userReducer
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.title, { color: "green" }]}>New Case</Text>
        <Text style={[styles.case, { color: "green" }]}>{newCases}</Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.title, { color: "orange" }]}>Recovery</Text>
        <Text style={[styles.case, { color: "orange" }]}>{recoveryCases}</Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.title, { color: "red" }]}>Death Cases</Text>
        <Text style={[styles.case, { color: "red" }]}>{deathCases}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    elevation: 3,
    width: "30%",
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 15,
    alignItems: "center",
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
  },

  case: {
    marginTop: 7,
    fontSize: 35,
    fontWeight: "bold",
  },
});

export default CaseMetrics;
