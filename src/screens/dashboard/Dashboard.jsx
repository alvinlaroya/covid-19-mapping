import { useEffect, useState } from "react";

// redux
import { useDispatch } from "react-redux";
import {
  setUserSession,
  setRecentCases,
  setCountCases,
  setAddresses,
} from "../../redux/actions";

import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

// react navigation
import { useNavigation } from "@react-navigation/native";

// firestore
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../_common/services/database";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../../_common/services/database";

// react native paper
import { Appbar } from "react-native-paper";

// components
import CaseMetrics from "../../components/dashboard/CaseMetrics";
import Chart from "../../components/dashboard/Chart";
import CaseToday from "../../components/dashboard/CaseToday";
import AuthButton from "../../components/button/AuthButton";

const App = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    const authObserve = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //const uid = user.uid;
          console.log(user);
          dispatch(setUserSession(user));
          navigation.navigate("Dashboard");
        } else {
          dispatch(setUserSession({}));
          navigation.navigate("SignIn");
        }
      });
    };

    authObserve();
  }, []);

  const getRecentCases = () => {
    const q = query(collection(db, "cases"), where("isRecentCase", "==", true));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let cases = [];
      var newCases = 0;
      var recoveryCases = 0;
      var deathCases = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        newCases += data.new;
        recoveryCases += data.recovery;
        deathCases += data.death;

        cases.push({
          id: doc.id,
          ...data,
          totalCase: data.new + data.recovery + data.death,
        });
      });
      dispatch(setRecentCases(cases));
      dispatch(
        setCountCases({
          newCases,
          recoveryCases,
          deathCases,
        })
      );
    });

    return unsubscribe;
  };

  const getAddresses = async () => {
    const q = query(collection(db, "addresses"));
    const querySnapshot = await getDocs(q);
    const addresses = [];
    querySnapshot.forEach((doc) => {
      addresses.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    dispatch(setAddresses(addresses));
  };

  useEffect(() => {
    getRecentCases();
    getAddresses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.header} elevated>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content
          title="Dashboard"
          titleStyle={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
          }}
        />
        <AuthButton />
      </Appbar.Header>
      <ScrollView style={styles.section}>
        <CaseMetrics />
        <Chart />
        <CaseToday />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },

  section: {
    flex: 1,
    padding: 15,
  },

  header: {
    backgroundColor: "white",
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default App;
