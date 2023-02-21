import React from "react";
import { DataTable } from "react-native-paper";

// redux
import { useSelector } from "react-redux";

const CaseTodayTable = () => {
  const { cases } = useSelector((state) => state.userReducer);
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Barangay</DataTable.Title>
        <DataTable.Title numeric>Total of cases</DataTable.Title>
      </DataTable.Header>

      {cases.map((data, i) => (
        <DataTable.Row key={i}>
          <DataTable.Cell>{data.barangay}</DataTable.Cell>
          <DataTable.Cell numeric>{data.totalCase}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default CaseTodayTable;
