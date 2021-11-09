import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTable } from "react-table";
import { DataContainer } from "../Style";
import { usePolling } from "../../Hooks/useIpcOn";
import ApplyButton from "../ApplyButton";
const { ipcRenderer } = window.require("electron");
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
  vertical-align: top;
  overflow-y: scroll;
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
const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`
const ButtonContainer = styled.div`
  height: auto;
  padding: 5px;
`

const Container = styled.div`
  overflow: scroll;
  height: 90%;
  width: 100%;
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
    default:
      return "invalid";
  }
};
const SetupTypeParse = (val) => {
  switch (val) {
    case 0:
      return "invalid";
    case 5:
      return "ID Change";
    case 34:
      return "Evnet Enanle Flag";
    case 35:
      return "AI DeadBand";
    case 36:
      return "AO DeadBand";
    case 37:
      return "LM DISPLAY DEVICE LED PERIOD";
    case 38:
      return "LM DISPLAY DEVICE LED On Time";
    case 39:
      return "LM DISPLAY RS485 LED PERIOD";
    case 40:
      return "LM DISPLAY RS485 LED On TIme";
    case 41:
      return "LD DISPLAY MODULE LED PERIOD";
    case 42:
      return "LD DISPLAY MODULE LED On Time";
    case 43:
      return "LD DISPLAY RS485 LED PERIOD";
    case 44:
      return "LD DISPLAY RS485 LED On TIme";
    case 45:
      return "LD DISPLAY EVENT LED PERIOD";
    case 46:
      return "LD DISPLAY EVENT LED On TIme";
    case 47:
      return "Local Time";
    case 48:
      return "RS485 Device Address";
    case 49:
      return "RS485 BaudRate";
    case 50:
      return "RS485 Parity";      
    case 51:
      return "RS485 StopBits";      
    case 52:
      return "Control Channel";       
    case 53:
      return "Password";
    default:
      return "invalid";
  }
};
const SetupSourceParse = (val) => {
  switch (val) {
    case 0:
      return "invalid";
    case 1:
      return "A2750LMH";
    case 2:
      return "A2750LDH";
    case 3:
      return "HOST";
    case 4:
      return "RS485";
  }
};
const ModuleTypeParse = (val) => {
  
  switch (val) {
    case 0:
      return "invalid";
    case 1:
      return "A2750IO-DI";
    case 2:
      return "A2750IO-DO";
    case 3:
      return "A2750IO-AI";
    case 4:
      return "A2750IO-DI2";
    case 5:
      return "A2750IO-DIO";
    case 6:
      return "A2750IO-DO2";
    case 7:
      return "A2750IO-AIO";
    case 8:
      return "A2750IO-AI2";
    case 9:
      return "HOST"
    case 10:
      return "LDH"
    default:
      console.log(`invalid ${val}`);
      return "invalid";
  }
};

const ErrorTypeParse = (val) => {
  switch (val) {
    case 0:
      return "NAMED_DATA_STORAGE_RESULT__SUCCESS";
    case 1:
      return "NAMED_DATA_STORAGE_RESULT__IO_ERROR";
    case 2:
      return "NAMED_DATA_STORAGE_RESULT__FORMAT_ERROR";
    case 3:
      return "NAMED_DATA_STORAGE_RESULT__CRC_ERROR";
    case 4:
      return "NAMED_DATA_STORAGE_RESULT__COMPARE_ERROR";
    case 5:
      return "EVENT_SELF_DIAGNOSIS_MODULE_OVER";
    default:
      return "invalid";
  }
};

const ClearParse = (val) => {
  switch (val) {
    case 1:
      return "EVENT_DATA_CLEAR_MAX_MIN_DATA";
    case 2:
      return "EVENT_DATA_CLEAR_EVENT_DATA";
    default:
      return "invalid";
  }
};
const ModuleMEventParse =(
  count,
  detail,
  detail1,
  detail2,
  detail3,
  detail4
) => {
  switch(count){
    case 1:
      return `module type = ${ModuleTypeParse((detail1 >> 16) & 0xffff)} , Module ID = ${detail1 & 0xffff}`;
    case 2:
      return `module 1 type = ${ModuleTypeParse((detail1 >> 16) & 0xffff)} , Module 1 ID = ${detail1 & 0xffff} , 
               module 2 type = ${ModuleTypeParse((detail2 >> 16) & 0xffff)} , Module 2 ID = ${detail2 & 0xffff}`;
    case 3:
      return `module 1 type = ${ModuleTypeParse(
        (detail1 >> 16) & 0xffff)} , Module 1 ID = ${detail1 & 0xffff} ,  module 2 type = ${ModuleTypeParse(
          (detail2 >> 16) & 0xffff)} , Module 2 ID = ${detail2 & 0xffff},  module 3 type = ${ModuleTypeParse(
            (detail3 >> 16) & 0xffff)} , Module 3 ID = ${detail3 & 0xffff}`;
    case 4:
      return ` module 1 type = ${ModuleTypeParse(
        (detail1 >> 16) & 0xffff)} , Module 1 ID = ${detail1 & 0xffff} ,  module 2 type = ${ModuleTypeParse(
          (detail2 >> 16) & 0xffff)} , Module 2 ID = ${detail2 & 0xffff},  module 3 type = ${ModuleTypeParse(
            (detail3 >> 16) & 0xffff)} , Module 3 ID = ${detail3 & 0xffff}, module 4 type = ${ModuleTypeParse(
              (detail4 >> 16) & 0xffff)} , Module 4 ID = ${detail4 & 0xffff}`;
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
      return `Storing Module Connection Count= ${detail}`;
    case 2:
      const moduleCnt = detail;
      return `Missing Module Count= ${moduleCnt},  ${ModuleMEventParse(moduleCnt, detail, detail1, detail2,detail3,detail4)}`;
    case 3:
      const moduleCnt1 = detail;
      return `Reconnected Module Count= ${moduleCnt1}, ${ModuleMEventParse(moduleCnt1, detail, detail1, detail2,detail3,detail4)}`;
    case 4:      
      const moduleCnt2 = detail;
      return `Added Module Count= ${moduleCnt2}, ${ModuleMEventParse(moduleCnt2, detail, detail1, detail2,detail3,detail4)}`;
    case 5:
      return `Confilct Module Count= ${detail}, Module ID = ${detail1 & 0xffff} `;
    case 6:
      return `Zero Module Count= ${detail},  Module ID = ${detail1 & 0xffff} `;
    case 7:
      return `Invaild Module Count= ${detail},  Module ID = ${detail1 & 0xffff} `;
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

      if (moduleID == 0) {
        return `LM Channel = ${ch} DI state = ${diState}`;
      } else {
        return `Module id = ${moduleID} Channel = ${ch} DI state = ${diState}`;
      }
      
    }
    case 2: {
      const doState = ((val >> 20) & 0x7) === 0x1 ? "Closed" : "Open";
      const moduleID = (val >> 16) & 0xf;
      const ch = val & 0xffff;
      if (moduleID == 0) {
        return `LM Channel = ${ch} DO state = ${doState}`;
      } else {
        return `Module id = ${moduleID} Channel = ${ch} DO state = ${doState}`;
      }
    }
    case 3: {
      const moduleID = (val >> 16) & 0xf;
      const ch = val & 0xffff;
      return `Module id = ${moduleID} Channel = ${ch} AI state = ${detail} -> ${detail1}`;
    }
    case 4: {
      const moduleID = (val >> 16) & 0xf;
      const ch = val & 0xffff;
      return `Module id = ${moduleID} Channel = ${ch} AO state = ${detail} -> ${detail1}`;
    }
    case 5: {
      const setupType = SetupTypeParse((val >> 16) & 0x7f);
      const moduleID = (val >> 10) & 0x3f;
      const ch = val & 0x3f0;
      const source = SetupSourceParse(val & 0xf);
      return `Setup type = ${setupType} Module ID = ${moduleID} Channel = ${ch} Source = ${source}  Value = ${detail} -> ${detail1}`;
    }
    case 6: {
      const Type = ModuleTypeParse((val >> 19) & 0xf);
      const connectionState =
        ((detail >> 16) & 0xffff) === 1 ? "Connected" : "DisConnected";
      const moduleID = detail & 0xffff;
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
      const type = (val >> 16) & 0x7;
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
    detail4: 0,
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
  usePolling("set-event-fatch", (evt) => {
    if (evt.remainingCount > 0) {
      //ipcRenderer.send('get-event');
    }
  });

  usePolling("set-event", (evt) => {
    const new_events = evt.map((e) => {
      const type = ParseInfo(e.info);
      const content = ParseContent(
        e.info,
        e.detail,
        e.detail1,
        e.detail2,
        e.detail3,
        e.detail4
      );
      const index = e.index;
      const sec = new Date(e.sec * 1000);

      const data = {
        type: type,
        contents: content,
        index: index,
        date: sec.toLocaleString("en", { timeZone: "UTC" }),
      };
      return data;
    });
    
    setEvents([...new_events,...events]);
    // setEvents(arr=>  {
    //   new_events.map(e => {
    //     events.push(e);
    //   });
    //   console.log(events);
    //   return events;
    // })
    //setLoading(true);
  });

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
  const clickEvent = () => {
    ipcRenderer.send("get-event");
  };
  
  // console.log(loading);
  // console.log(events.length);
  if (!loading && events.length === 0) {
    return (
      <div>
        {" "}
        no event data avaliable
        <ApplyButton onClick={clickEvent} name="Apply"/>
      </div>
    );
  }

  return (
    <MainContainer>
      <ButtonContainer>
        {loading && <span> please wait we ar fetching data</span>}
        <ApplyButton onClick={clickEvent} name="Apply"/>
      </ButtonContainer>
      <Container>
        <EventTable columns={columns} data={events} />
      </Container>
    </MainContainer>
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
