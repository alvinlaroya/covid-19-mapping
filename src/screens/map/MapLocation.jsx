import { useState, useEffect } from "react";

import { SafeAreaView, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// react navigation
import { useNavigation } from "@react-navigation/native";

// momentt
import moment from "moment";

// redux
import { useSelector } from "react-redux";

// react native paper
import { Appbar, Modal, Portal, Text, IconButton } from "react-native-paper";

// components
import AuthButton from "../../components/button/AuthButton";

const App = () => {
  const navigation = useNavigation();

  const { cases, location } = useSelector((state) => state.userReducer);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [caseDetail, setCaseDetail] = useState({});

  const showModal = (data) => {
    console.log(data.createdAt.seconds);
    setShowDetailModal(true);
    setCaseDetail(data);
  };
  const hideModal = () => setShowDetailModal(false);
  const containerStyle = { backgroundColor: "white", margin: 40, padding: 20 };

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
          title={`Map Case Location`}
          titleStyle={{
            color: "black",
            fontSize: 14,
          }}
        />
        <AuthButton />
      </Appbar.Header>
      <View style={styles.container}>
        <Portal>
          <Modal
            visible={showDetailModal}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <IconButton
                icon="close"
                iconColor="black"
                size={25}
                style={{ marginTop: -15, marginRight: -15, marginBottom: -10 }}
                onPress={hideModal}
              />
            </View>
            <Text style={styles.caseDetail}>
              Date:{" "}
              {moment(caseDetail?.createdAt?.seconds * 1000).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </Text>
            <Text style={styles.caseDetail}>
              Barangay: {caseDetail.barangay}
            </Text>
            <Text style={styles.caseDetail}>New Cases: {caseDetail.new}</Text>
            <Text style={styles.caseDetail}>
              Recoveries: {caseDetail.recovery}
            </Text>
            <Text style={styles.caseDetail}>Deaths: {caseDetail.death}</Text>
          </Modal>
        </Portal>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={
            location.latitude !== null && location.longitude !== null
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : {
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
          }
          showsUserLocation={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoors={true}
          rotateEnabled={true}
          loadingEnabled={true}
          showsMyLocationButton={true}
          showsCompass={true}
        >
          {cases.map((data, i) => (
            <Marker
              key={i}
              coordinate={{
                latitude: data.location.latitude,
                longitude: data.location.longitude,
              }}
              title={data.barangay}
              description={`Total Cases: ${data.totalCase}`}
              onCalloutPress={() => {
                showModal(data);
              }}
            />
          ))}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  caseDetail: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 4,
  },
});

export default App;
