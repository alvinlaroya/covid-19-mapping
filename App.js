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
import SignInScreen from "./src/screens/auth/SignIn.jsx";
import SignUpScreen from "./src/screens/auth/SignUp.jsx";
import DashboardScreen from "./src/screens/dashboard/Dashboard.jsx";
import MapLocationScreen from "./src/screens/map/MapLocation.jsx";
import MunicipalityNewsScreen from "./src/screens/news/MunicipalityNews.jsx";
import CaseScreen from "./src/screens/case/Case.jsx";
import CaseHistoryScreen from "./src/screens/case/CaseHistoy.jsx";
import CaseUpdateScreen from "./src/screens/case/UpdateCase.jsx";
import UpdateCaseFormScreen from "./src/screens/case/UpdateCaseForm";


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
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
