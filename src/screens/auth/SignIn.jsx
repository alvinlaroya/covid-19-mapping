import React, { useState, useEffect } from "react";

//redux
import { useDispatch } from "react-redux";
import { setUserSession } from "../../redux/actions";

// firestore
import { auth } from "../../_common/services/database";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/* var background = require('./assets/citybackground.jpg'); */
/* var logo = require("../img/etulodlogo.png"); */

const SignInScreen = ({ props, navigation }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const signinUser = (emailVal, passwordVal) => {
    setButtonLoading(true);
    try {
      signInWithEmailAndPassword(auth, emailVal, passwordVal)
        .then((userCredential) => {
          // Signed in
          setButtonLoading(false);
          dispatch(setUserSession(userCredential.user));
          navigation.navigate("Dashboard");
          // ...
        })
        .catch((error) => {
          setButtonLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert("Login Failed!", errorMessage);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        style="dark"
        barStyle="dark-content"
        StatusBarAnimation="slide"
      />
      <View style={styles.formContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/5087/5087579.png",
          }}
          style={styles.logo}
        ></Image>
        <Text style={styles.title}>covid-19 mapping</Text>
        <View style={styles.SectionStyle}>
          <MaterialCommunityIcons
            name="email-outline"
            color="black"
            size={25}
            style={styles.iconInput}
          />
          <TextInput
            style={styles.usernameInput}
            onChangeText={(email) => setEmail(email)}
            /*  value={emailValue} */
            placeholder={"Place your Email"}
          />
        </View>

        <View style={styles.SectionStyle}>
          <MaterialCommunityIcons
            name="lock-outline"
            color="black"
            size={25}
            style={styles.iconInput}
          />
          <TextInput
            style={styles.passwordInput}
            onChangeText={(password) => setPassword(password)}
            /*  value={passwordValue} */
            secureTextEntry={!passwordVisible}
            placeholder={"Place your Password"}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <MaterialCommunityIcons
              name={passwordVisible ? `eye-off-outline` : `eye-outline`}
              color="black"
              size={25}
              style={styles.iconInput}
            />
          </TouchableOpacity>
        </View>
        <Button
          contentStyle={{ height: 50 }}
          labelStyle={{ fontSize: 18 }}
          style={styles.appButtonContainer}
          loading={buttonLoading == true ? true : false}
          mode="contained"
          onPress={() => signinUser(email, password)}
        >
          LOGIN
        </Button>
        <Button
          contentStyle={{ height: 50 }}
          labelStyle={{ fontSize: 18 }}
          style={styles.appButtonContainer2}
          mode="contained"
          onPress={() => navigation.navigate("Dashboard")}
        >
          BACK TO DASHBOARD
        </Button>
        {/* <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.appButtonTextSignUp}>
            Don't have an account?{" "}
            <Text style={{ color: "#c90632" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 20,
  },
  title: {
    color: "black",
    marginBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
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
  SectionStyle: {
    elevation: 2,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  iconInput: {
    padding: 10,
  },
  appButtonContainer: {
    elevation: 4,
    backgroundColor: "#05686e",
    borderRadius: 25,
    width: "100%",
    height: 50,
    marginBottom: 10,
    fontSize: 25,
  },
  appButtonContainer2: {
    elevation: 4,
    backgroundColor: "red",
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
});
