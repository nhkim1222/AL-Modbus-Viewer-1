import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import { DataContainer } from "../Style";
import { usePolling } from "../../Hooks/useIpcOn";

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

const ParseInfo = (val) => {
  const eventType = (val >> 23) & 0x1f;
  switch (eventType) {
    case 0:
      return "invalid";
    case 1:
      return "DI";
    case 2:
      return "DO";
    case 3:
      return "AI";
    case 4:
      return "AO";
    case 5:
      return "Setup Change";
    case 6:
      return "Module Connection";
    case 7:
      return "Redundancy";
    case 8:
      return "Self-Diagnosis";
    case 9:
      return "Data Clear";
    case 10:
      return "Module Management";
  }
};
const SetupTypeParse = (val) => {
  switch (val) {
    case 0:
      return "invalid";
    case 1:
      return "used logic";
    case 2:
      return "Protection";
    case 3:
      return "Control";
    case 4:
      return "IO";
    case 5:
      return "Setup Change";
    case 6:
      return "Module Connection";
    case 7:
      return "Redundancy";
    case 8:
      return "Self-Diagnosis";
    case 9:
      return "Data Clear";
    case 10:
      return "Module Management";
  }
};
const ModuleManagementParse = (
  type,
  detail,
  detail1,
  detail2,
  detail3,
  detail4
) => {
  switch (type) {
    case 0:
      return "invalid";
    case 1:
      return `Storing Module Connection Count= ${detail}, ${detail1}`;
    case 2:
      return `Missing Module Count= ${detail}, module type = ${ModuleTypeParse(
        (detail1 >> 16) & 0xffff
      )} , Module ID = ${detail1 & 0xffff} `;
    case 3:
      return `Reconnected Module Count= ${detail}, module type = ${ModuleTypeParse(
        (detail1 >> 16) & 0xffff
      )} , Module ID = ${detail1 & 0xffff} `;
    case 4:
      return `Added Module Count= ${detail}, module type = ${ModuleTypeParse(
        (detail1 >> 16) & 0xffff
      )} , Module ID = ${detail1 & 0xffff} `;
    case 5:
      return `Confilct Module Count= ${detail}, module type = ${ModuleTypeParse(
        (detail1 >> 16) & 0xffff
      )} , Module ID = ${detail1 & 0xffff} `;
    case 6:
      return `Zero Module Count= ${detail},  Module ID = ${detail1 & 0xffff} `;
    case 7:
      return `Invaild Module Count= ${detail},  Module ID = ${
        detail1 & 0xffff
      } `;
  }
};

const ParseContent = (val, detail, detail1, detail2, detail3, detail4) => {
  const eventType = (val >> 23) & 0x1f;
  switch (eventType) {
    case 0:
      return "invalid";
    case 1: {
      //DI
      const diState =
        ((val >> 20) & 0x7) === 0x1 ? "Energized" : "De-Energized";
      const moduleID = (val >> 16) & 0xf;
      const ch = val & 0xffff;
      return `Module id = ${moduleID} Channel = ${ch} DI state = ${diState}`;
    }
    case 2: {
      const doState = ((val >> 20) & 0x7) === 0x1 ? "Closed" : "Open";
      const moduleID = (val >> 16) & 0xf;
      const ch = val & 0xffff;
      return `Module id = ${moduleID} Channel = ${ch} DO state = ${doState}`;
    }
    case 3: {
      const moduleID = (val >> 16) & 0xf;
      const ch = val & 0xffff;
      return `Module id = ${moduleID} Channel = ${ch} AI state = ${detail1} -> ${detail}`;
    }
    case 4: {
      const moduleID = (val >> 16) & 0xf;
      const ch = val & 0xffff;
      return `Module id = ${moduleID} Channel = ${ch} AO state = ${detail1} -> ${detail}`;
    }
    case 5: {
      const setupType = SetupTypeParse((val >> 16) & 0x7f);
      const moduleID = (val >> 10) & 0x3f;
      const ch = val & 0x3ff;
      return `Setup type = ${setupType} Module ID = ${moduleID} Channel = ${ch}  ${detail1} -> ${detail}`;
    }
    case 6: {
      const Type = ModuleTypeParse((val >> 19) & 0x7f);
      const connectionState =
        ((detail >> 16) & 0xffff) === 1 ? "Connected" : "DisConnected";
      const moduleID = val & 0xffff;
      return `Module type = ${Type} Module ID = ${moduleID} Module ${connectionState} `;
    }
    case 7: {
      const Type = ((val >> 19) & 0xf) === 1 ? "broken" : "recover";
      return `A2750IOH Ring ${Type}  ${detail}th position from IO1 Port , Last ID${detail1} `;
    }
    case 8: {
      const Type = ErrorTypeParse((val >> 16) & 0x7f);
      return `type = ${Type}  error = ${detail}`;
    }
    case 9: {
      const Type = ClearParse((val >> 19) & 0xf);
      const source = (val >> 16) * 0x3;
      return ` ${Type}  source =  ${source}`;
    }
    case 10: {
      const type = (val >> 16) & 0x3;
      return ModuleManagementParse(
        type,
        detail,
        detail1,
        detail2,
        detail3,
        detail4
      );
    }
  }
};

function LMEvents() {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState({
    info: 0,
    sec: 0,
    msec: 0,
    index: 0,
    detail: 0,
    detail1: 0,
    detail2: 0,
    detail3: 0,
    detatil4: 0,
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setLoading(true);
    // const e = {
    //   index: 1,
    //   date: "2021.06.12",
    //   type: "DI",
    //   contents: "non",
    // };
    // setEvents(events.concat(e));
    setLoading(false);
  }, []);

  usePolling("set-event", (evt) => {
    console.log(evt);
  });

  // const type = ParseInfo(event.info);
  // const content = ParseContent(
  //   event.info,
  //   event.detail,
  //   event.detail1,
  //   event.detail2,
  //   event.detail3,
  //   event.detail4
  // );

  // const data = {
  //   type: type,
  //   content: content,
  // };
  // setEvents(events.concat(data));
  // const data = useMemo(
  //   () => [
  //     {
  //       index: 1,
  //       date: "2021.06.03",
  //       type: "DI",
  //       contents: "Channel01 Energized data1",
  //     },
  //     {
  //       index: 2,
  //       date: "2021.06.03",
  //       type: "DI",
  //       contents: "Channel02 Energized",
  //     },
  //     {
  //       index: 3,
  //       date: "2021.06.03",
  //       type: "module-management",
  //       contents: "Channel02 Energized",
  //     },
  //   ],
  //   []
  // );
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
  if (!loading && events.length === 0) {
    return <div> no event data avaliable</div>;
  }

  return (
    <DataContainer>
      {loading && <span> please wait we ar fetching data</span>}
      <EventTable columns={columns} data={events} />
    </DataContainer>
  );
}

function EventTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Render the UI for your table
  return (
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
                    {/* {cell.column.Header === "EventType" ? (
                        <TypeLabel type={cell.value}>{cell.value}</TypeLabel>
                      ) : (
                        <label>{cell.value}</label>
                      )} */}
                    {cell.render("Cell")}
                  </TableData>
                );
              })}
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
}

export default LMEvents;
