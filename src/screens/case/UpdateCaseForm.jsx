import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// react navigation
import { useNavigation } from "@react-navigation/native";

// react-native-paper
import { Appbar, IconButton, Button, TextInput } from "react-native-paper";

// redux
import { useSelector, useDispatch } from "react-redux";

// firestore
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../_common/services/database";

// components
import AuthButton from "../../components/button/AuthButton";
import CaseTable from "../../components/table/CaseTable";

const UpdateCase = () => {
  const navigation = useNavigation();

  const { currentCase } = useSelector((state) => state.userReducer);

  const [newCase, setNewCase] = useState(currentCase.new);
  const [recoveryCase, setRecoveryCase] = useState(currentCase.recovery);
  const [deathCase, setDeathCase] = useState(currentCase.death);

  const [isUpdating, setIsUpdating] = useState(false);

  const saveCaseHandler = async () => {
    setIsUpdating(true);
    const q = query(
      collection(db, "cases"),
      where("barangay", "==", currentCase.barangay),
      where("isRecentCase", "==", true)
    );

    const datas = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      datas.push({ id: doc.id, ...doc.data() });
    });

    if (datas.length > 0) {
      console.log("Has RECENT");
      const docRef = doc(db, "cases", datas[0].id);

      // Update the isRecentCase field with the value from the server
      await updateDoc(docRef, {
        isRecentCase: false,
      });
    } else {
      console.log("NO RECENT");
    }

    console.log(currentCase);

    await addDoc(collection(db, "cases"), {
      barangay: currentCase.barangay,
      new: Number(newCase),
      recovery: Number(recoveryCase),
      death: Number(deathCase),
      isRecentCase: true,
      location: currentCase.location,
      createdAt: serverTimestamp(),
    }).then(() => {
      setIsUpdating(false);
      setNewCase(0);
      setRecoveryCase(0);
      setDeathCase(0);
      navigation.navigate("UpdateCase");
    });
  };

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
          title={currentCase.barangay}
          titleStyle={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
          }}
        />
        <AuthButton />
      </Appbar.Header>
      <View style={styles.section}>
        <View>
          <Text>Current New Cases: {currentCase.new}</Text>
          <TextInput
            dense={true}
            label="Enter New Case"
            onChangeText={(value) => setNewCase(value)}
            value={newCase}
            keyboardType="numeric"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Current Recovery Cases: {currentCase.recovery}</Text>
          <TextInput
            dense={true}
            label="Enter Recovery Cases"
            onChangeText={(value) => setRecoveryCase(value)}
            value={recoveryCase}
            keyboardType="numeric"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text>Current Death Cases: {currentCase.death}</Text>
          <TextInput
            dense={true}
            label="Enter Death Cases"
            onChangeText={(value) => setDeathCase(value)}
            value={deathCase}
            keyboardType="numeric"
          />
        </View>
        <Button
          contentStyle={{ height: 50 }}
          labelStyle={{ fontSize: 18 }}
          style={styles.appButtonContainer}
          loading={isUpdating}
          mode="contained"
          onPress={saveCaseHandler}
        >
          {isUpdating ? "Saving" : "Save Case"}
        </Button>
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

  appButtonContainer: {
    elevation: 4,
    marginTop: 15,
    backgroundColor: "#de6d1d",
    borderRadius: 5,
    width: "100%",
    height: 50,
    marginBottom: 14,
    fontSize: 25,
  },
});

export default UpdateCase;
