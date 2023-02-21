import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AppRegistry, View, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";

// redux
import { Provider } from "react-redux";
import { Store } from "./src/redux/store";
import { auth } from "./src/_common/services/database";

// react navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
/* import { createNativeStackNavigator } from "@react-navigation/native-stack"; */

// screens
import SignInScreen from "./src/screens/auth/SignIn";
import SignUpScreen from "./src/screens/auth/SignUp";
import DashboardScreen from "./src/screens/dashboard/Dashboard";
import MapLocationScreen from "./src/screens/map/MapLocation";
import MunicipalityNewsScreen from "./src/screens/news/MunicipalityNews";
import CaseScreen from "./src/screens/case/Case";
import CaseHistoryScreen from "./src/screens/case/CaseHistoy";
import CaseUpdateScreen from "./src/screens/case/UpdateCase";
import UpdateCaseFormScreen from "./src/screens/case/UpdateCaseForm";
import AddressScreen from "./src/screens/address/Address";


// components
import DrawerContainer from "./src/components/drawer/Drawer.jsx";

// react stack navigation initialize
const Drawer = createDrawerNavigator();
/* const Stack = createNativeStackNavigator(); */


export default function Main() {
  useEffect(() => {
    console.log("Init");
  }, []);

  return (
    <Provider store={Store}>
      <StatusBar backgroundColor="black" style="light" />
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={() => <DrawerContainer />} initialRouteName="Dashboard">
            <Drawer.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="MapLocation"
              component={MapLocationScreen}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="MunicipalityNews"
              component={MunicipalityNewsScreen}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="Case"
              component={CaseScreen}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="CaseHistory"
              component={CaseHistoryScreen}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="UpdateCase"
              component={CaseUpdateScreen}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="UpdateCaseForm"
              component={UpdateCaseFormScreen}
              options={{ headerShown: false }}
            />
            <Drawer.Screen
              name="Addresses"
              component={AddressScreen}
              options={{ headerShown: false }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
