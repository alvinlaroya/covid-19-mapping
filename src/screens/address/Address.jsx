import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

// react navigation
import { useNavigation } from "@react-navigation/native";

// react-native-paper
import { Appbar, IconButton } from "react-native-paper";

// components
import AuthButton from "../../components/button/AuthButton";
import AddressesTable from "../../components/table/AddressesTable";

const Case = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header} elevated>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          title="Case History"
          titleStyle={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
          }}
        />
        <AuthButton />
      </Appbar.Header>
      <ScrollView style={styles.section}>
        <AddressesTable />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  section: {
    padding: 15,
  },

  title: {
    color: "black",
    fontSize: 23,
    fontWeight: "bold",
  },
});

export default Case;
