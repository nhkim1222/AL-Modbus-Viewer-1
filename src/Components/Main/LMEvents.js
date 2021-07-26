import React, { useMemo } from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import { DataContainer } from "../Style";
const typeColor = {
  DI: "red",
  DO: "red",
  AI: "red",
  "module-management": "green",
};
const Table = styled.table`
  width: 100%;
  :even {
    background-color: grey;
  }
`;
const TableHeaderRow = styled.th`
  border-bottom: solid 1px orange;
  color: grey;
  font-weight: 600;
  padding: 10px;
  :last-child {
    text-align: left;
  }
`;
const TableRow = styled.tr`
  :nth-child(2n) {
    background-color: #10101010;
  }
`;
const TableData = styled.td`
  padding: 10px;
  border-bottom: solid 1px #f9f9f9;
  :last-child {
    width: 100%;
    flex-flow: 3;
  }
  :nth-child(1) {
    text-align: center;
    flex-flow: 1;
  }
  :nth-child(2) {
    text-align: center;
    flex-flow: 1;
  }
  :nth-child(3) {
    text-align: center;
    flex-flow: 1;
  }
`;
const TypeLabel = styled.div`
  padding: 3px;
  color: white;
  background-color: ${(props) => typeColor[props.type]};
  border-radius: 2px;
`;
function LMEvents() {
  const data = useMemo(
    () => [
      {
        index: 1,
        date: "2021.06.03",
        type: "DI",
        contents: "Channel01 Energized<p> data1",
      },
      {
        index: 2,
        date: "2021.06.03",
        type: "DI",
        contents: "Channel02 Energized",
      },
      {
        index: 3,
        date: "2021.06.03",
        type: "module-management",
        contents: "Channel02 Energized",
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: "Index",
        accessor: "index",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "EventType",
        accessor: "type",
      },
      {
        Header: "Contents",
        accessor: "contents",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <DataContainer>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <TableHeaderRow {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableHeaderRow>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableData {...cell.getCellProps()}>
                      {cell.column.Header === "EventType" ? (
                        <TypeLabel type={cell.value}>{cell.value}</TypeLabel>
                      ) : (
                        <label>{cell.value}</label>
                      )}
                    </TableData>
                  );
                })}
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </DataContainer>
  );
}

export default LMEvents;
