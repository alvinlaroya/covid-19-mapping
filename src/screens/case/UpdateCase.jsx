import React from "react";
import { StyleSheet, Text, View } from "react-native";

// react navigation
import { useNavigation } from "@react-navigation/native";

// react-native-paper
import { Appbar, IconButton } from "react-native-paper";

// components
import AuthButton from "../../components/button/AuthButton";
import CaseTable from "../../components/table/CaseTable";

const UpdateCase = () => {
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
          title="Update Barangay Covid Cases"
          titleStyle={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
          }}
        />
        <AuthButton />
      </Appbar.Header>
      <View style={styles.section}>
        <CaseTable />
      </View>
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

export default UpdateCase;
