import React, { useEffect, useState } from "react";
import { DataTable, IconButton } from "react-native-paper";

// redux
import { useSelector } from "react-redux";

// moment.js
import moment from "moment";

const CaseTable = () => {
  const { currentCaseHistory } = useSelector((state) => state.userReducer);

  return (
    <DataTable style={{ marginBottom: 20 }}>
      <DataTable.Header>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title numeric>New</DataTable.Title>
        <DataTable.Title numeric>Recovery</DataTable.Title>
        <DataTable.Title numeric>Death</DataTable.Title>
      </DataTable.Header>

      {currentCaseHistory.map((data, i) => (
        <DataTable.Row key={i}>
          <DataTable.Cell>
            {moment(data.createdAt.seconds * 1000).format("l")}
          </DataTable.Cell>
          <DataTable.Cell numeric>{data.new}</DataTable.Cell>
          <DataTable.Cell numeric>{data.recovery}</DataTable.Cell>
          <DataTable.Cell numeric>{data.death}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
};

export default CaseTable;
