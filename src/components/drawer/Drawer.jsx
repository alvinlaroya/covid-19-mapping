import React from "react";

// redux
import { useSelector } from "react-redux";

// firestore
import { auth } from "../../_common/services/database";

import { StyleSheet, Text, View } from "react-native";
import { Avatar, Drawer, List } from "react-native-paper";

// react navigation
import { useNavigation } from "@react-navigation/native";

const DrawerContainer = () => {
  const { user } = useSelector((state) => state.userReducer);

  const navigation = useNavigation();

  const [active, setActive] = React.useState("1");

  const drawerItemPressedHandler = (item) => {
    switch (item) {
      case "1":
        navigation.navigate("Dashboard");
        setActive(item);
        break;
      case "2":
        navigation.navigate("MapLocation");
        setActive(item);
        break;
      case "3":
        navigation.navigate("MunicipalityNews");
        setActive(item);
        break;
      case "4":
        navigation.navigate("Addresses");
        setActive(item);
        break;
      default:
        setActive("0");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 25, marginTop: 10 }}>
        <Avatar.Image
          size={64}
          source={{
            uri: "https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
          }}
        />
        {auth.currentUser ? (
          <>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
              {user.displayName}
            </Text>
            <Text style={{ fontSize: 15, marginTop: 3 }}>{user.email}</Text>
          </>
        ) : (
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
            covid-19 mapping
          </Text>
        )}
      </View>
      <View style={styles.container}>
        <Drawer.Section title="Navigation">
          <Drawer.Item
            label="Dashboard"
            icon="application"
            active={active === "1"}
            onPress={() => drawerItemPressedHandler("1")}
          />
          <Drawer.Item
            label="Map Case Location"
            icon="map-marker"
            active={active === "2"}
            onPress={() => drawerItemPressedHandler("2")}
          />
          <Drawer.Item
            label="Municipality News"
            icon="newspaper"
            active={active === "3"}
            onPress={() => drawerItemPressedHandler("3")}
          />
          <Drawer.Item
            label="Case History"
            icon="history"
            active={active === "4"}
            onPress={() => drawerItemPressedHandler("4")}
          />
        </Drawer.Section>
      </View>
      {auth.currentUser && (
        <View style={{ padding: 5 }}>
          <List.Section>
            <List.Accordion
              title="Case Actions"
              style={{ backgroundColor: "white" }}
            >
              <List.Item
                title="Update Case"
                onPress={() => {
                  navigation.navigate("Case");
                }}
                left={(props) => <List.Icon {...props} icon="pencil" />}
              />
            </List.Accordion>
          </List.Section>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 5,
  },

  card: {
    elevation: 3,
    height: 90,
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

  drawerItem: {
    fontWeight: "bold",
    color: "red",
  },
});

export default DrawerContainer;
