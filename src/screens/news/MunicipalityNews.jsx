import { useEffect } from "react";

import { SafeAreaView, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

// react navigation
import { useNavigation } from "@react-navigation/native";

// react native paper
import { Appbar, IconButton, List } from "react-native-paper";

// components
import AuthButton from "../../components/button/AuthButton";

const MunicipalityNews = () => {
  const navigation = useNavigation();

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
          title="Municipality News"
          titleStyle={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
          }}
        />
        <AuthButton />
      </Appbar.Header>
      <WebView
        style={styles.container}
        source={{
          uri: "https://www.facebook.com/Municipality-of-Agoo-La-Union-105164238933670",
        }}
      />
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

export default MunicipalityNews;
