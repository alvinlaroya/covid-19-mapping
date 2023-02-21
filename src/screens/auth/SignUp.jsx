import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

//redux
import { useDispatch } from "react-redux";
import { setUserSession } from "../../redux/actions";

// firestore
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../_common/services/database";

import { Button, TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SignUpScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mname, setMname] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authKey, setAuthKey] = useState("");

  const appAuthKey = "covid19mappingauthkey";

  const signupUser = async (
    fnameVal,
    mnameVal,
    lnameVal,
    emailVal,
    passwordVal
  ) => {
    setIsSigningUp(true);
    try {
      if (
        fnameVal === "" &&
        mnameVal === "" &&
        lnameVal === "" &&
        emailVal === "" &&
        passwordVal === "" &&
        authKey === ""
      ) {
        alert("Please fill all the fields!");
        setIsSigningUp(false);
        return;
      } else {
        if (authKey === appAuthKey) {
          createUserWithEmailAndPassword(auth, emailVal, passwordVal)
            .then((userCredential) => {
              // Signed in
              updateProfile(auth.currentUser, {
                displayName: `${fnameVal} ${mnameVal} ${lnameVal}`,
              })
                .then(() => {
                  // Profile updated!
                  // ...
                })
                .catch((error) => {
                  // An error occurred
                  // ...
                });

              dispatch(setUserSession(userCredential.user));
              navigation.navigate("Dashboard");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              Alert.alert("Signup Failed!", errorMessage);
            });
        } else {
          setIsSigningUp(false);
          Alert.alert("Signup Failed!", "Invalid Auth Key");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isSigningUp ? (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{
          uri: "https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif",
        }}
        style={{ width: "70%", height: 70 }}
      />
      <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: -15 }}>
        Signing Up
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <StatusBar style="dark" barStyle="dark-content" />
      <View style={styles.formContainer}>
        <View style={{ width: "100%" }}>
          <TextInput
            dense={true}
            label="First Name"
            onChangeText={(fname) => setFname(fname)}
          />
          <TextInput
            dense={true}
            label="Middle Name"
            onChangeText={(mname) => setMname(mname)}
            style={{ marginTop: 10 }}
          />
          <TextInput
            dense={true}
            label="Last Name"
            onChangeText={(lname) => setLname(lname)}
            style={{ marginTop: 10 }}
          />
          <TextInput
            dense={true}
            label="Email"
            onChangeText={(email) => setEmail(email)}
            style={{ marginTop: 10 }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "100%" }}>
              <TextInput
                dense={true}
                style={{ marginTop: 10 }}
                label="Password"
                secureTextEntry={!passwordVisible}
                onChangeText={(password) => setPassword(password)}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={{ position: "absolute", top: 12, right: 4 }}
              >
                <MaterialCommunityIcons
                  name={passwordVisible ? `eye-off-outline` : `eye-outline`}
                  color="black"
                  size={25}
                  style={styles.iconInput}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            dense={true}
            label="Auth Key"
            onChangeText={(key) => setAuthKey(key)}
            style={{ marginTop: 10 }}
          />
        </View>
        <Button
          contentStyle={{ height: 50 }}
          labelStyle={{ fontSize: 18 }}
          style={styles.appButtonContainer}
          loading={isSigningUp}
          mode="contained"
          onPress={() => signupUser(fname, mname, lname, email, password)}
        >
          SIGN UP
        </Button>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          style={{ marginBottom: 20 }}
        >
          <Text style={styles.appButtonTextSignUp}>
            Have already an account?{" "}
            <Text style={{ color: "#c90632" }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  usernameInput: {
    fontSize: 15,
    flex: 1,
    borderRadius: 25,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
  passwordInput: {
    fontSize: 15,
    flex: 1,
    borderRadius: 25,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
  iconInput: {
    padding: 10,
  },
  appButtonContainer: {
    elevation: 4,
    marginTop: 15,
    backgroundColor: "#05686e",
    borderRadius: 25,
    width: "100%",
    height: 50,
    marginBottom: 14,
    fontSize: 25,
  },
  appButtonTextSignUp: {
    fontSize: 14,
    color: "black",
    alignSelf: "center",
  },
  bottom: {
    backgroundColor: "white",
    elevation: 0,
  },
});
