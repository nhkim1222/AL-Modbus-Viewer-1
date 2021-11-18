import React, { useState, useEffect } from "react";
import { usePolling } from "../../Hooks/useIpcOn";
import { useInterval } from "../../Hooks/useInterval";
import styled from "styled-components";
import { DataContent } from "../DataContent";

const Container = styled.div`
  justify-content: left;
  align-items: center;
  padding: 5px;
  border-bottom: 0.5px solid rgba(100, 100, 100, 0.2);
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: grey;
  width: auto;
  //height: 24px;
  padding-left: 1px;
  font-size: 10px;
`;

const type_parse = (value) =>{
  switch (value) {
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
  }
};
const isExist = (exist) => {
  if(exist == 1)
    return "Exist";
  else
    return "NONE";
};

function IOSetupView() {
  const [setupStatus, setSetupStatus] = useState([]);
  useEffect(() => {
    const list = [];
    for (var i = 0; i < 15; i++) {
      list.push({
        id: i,
        type: 0,
        exist: 0,
      });
    }
    setSetupStatus(list);
  }, []);

  usePolling("set-ioh-setup", setSetupStatus);
  useInterval(() => {
    if (true) {
      ipcRenderer.send("request-io-data", {io_id: 1});
    }
  }, 300);
  console.log(setupStatus);
  return (
    <Container>
      {setupStatus.map((setup) => (
        <div key={setup.id} style={{ display: "flex" }}>
          <Title>{setup.id}</Title>
          <DataContent
            prop="type"
            value={type_parse(setup.type)}
          ></DataContent>
          <DataContent
            prop="exist"
            value={isExist(setup.exist)}
          ></DataContent>
        </div>
      ))}
    </Container>
  );
}

export default IOSetupView;
