import React from "react";
import { DataTable, IconButton } from "react-native-paper";

// react navigation
import { useNavigation } from "@react-navigation/native";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setCurrentCase } from "../../redux/actions";

// firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../_common/services/database";

const CaseTable = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { addresses } = useSelector((state) => state.userReducer);

  const selectBarangayHandler = async (data) => {
    console.log(data);

    const q = query(
      collection(db, "cases"),
      where("barangay", "==", data.name),
      where("isRecentCase", "==", true)
    );

    const datas = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      datas.push({ id: doc.id, ...doc.data() });
    });

    if (datas.length > 0) {
      dispatch(
        setCurrentCase({
          barangay: data.name,
          new: datas[0].new,
          recovery: datas[0].recovery,
          death: datas[0].death,
          location: datas[0].location,
        })
      );
    } else {
      dispatch(
        setCurrentCase({
          barangay: data.name,
          new: 0,
          recovery: 0,
          death: 0,
          location: data.location,
        })
      );
    }

    navigation.navigate("UpdateCaseForm");
  };

  return (
    <DataTable style={{ marginBottom: 20 }}>
      <DataTable.Header>
        <DataTable.Title>Barangay</DataTable.Title>
        <DataTable.Title numeric>Action</DataTable.Title>
      </DataTable.Header>

      {addresses.map((data, i) => (
        <DataTable.Row key={i}>
          <DataTable.Cell>{data.name}</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon="pencil"
              iconColor="black"
              size={20}
              onPress={() => {
                selectBarangayHandler(data);
              }}
            />
          </DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default CaseTable;
