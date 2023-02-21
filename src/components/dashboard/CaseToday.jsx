import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

// components
import CaseTodayTable from "../table/CaseTodayTable";

const CaseToday = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.title]}>Total Cases</Text>
          <IconButton
            icon="filter"
            iconColor="black"
            size={20}
            style={{ marginTop: -5, marginRight: -5 }}
            onPress={() => console.log("Pressed")}
          />
        </View>
        <View>
          <CaseTodayTable />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 40,
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
    color: "black",
    fontSize: 23,
    fontWeight: "bold",
  },
});

export default CaseToday;
