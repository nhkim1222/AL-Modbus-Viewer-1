import React, { useState } from "react";
import styled from "styled-components";
import IODigitalInput from "../Components/Module/IODigitalInput";
import IODigitalOutput from "../Components/Module/IODigitalOutput";
import IOInformation from "../Components/Module/IOInformation";
import IOAnalogInput from "../Components/Module/IOAnalogInput";
import { useInterval } from "../Hooks/useInterval";
import { usePolling } from "../Hooks/useIpcOn";
const { ipcRenderer } = window.require("electron");

const Container = styled.div`
  display: flex;
  padding: 20px;
  overflow-y: auto;
  flex-direction: column;
`;

const ContainerChild = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

function IOModule(id) {
  useInterval(() => {
    ipcRenderer.send("get-io-information", { io_id: id.match.params.id });
    ipcRenderer.send("get-io-di-status", { io_id: id.match.params.id });
    ipcRenderer.send("get-io-do-status", { io_id: id.match.params.id });
    //ipcRenderer.send("get-io-ai-status", { io_id: id.match.params.id });    
    ipcRenderer.send("get-mismatch-alarm");
  }, 300);

  const [info, setInformation] = useState({
    operationMode: 0,
    moduleType: 0,
  });

  usePolling("set-io-information", setInformation);

  return (
    <Container>
      <IOInformation id={id.match.params.id} />
      {info.moduleType == 5 ? (
        <IODigitalInput id={id.match.params.id} />
      ) : (
        <div></div>
      )}
      {info.moduleType == 5 ? (
        <IODigitalOutput id={id.match.params.id} />
      ) : (
        <div></div>
      )}
      {info.moduleType == 8 ? (
        <IOAnalogInput id={id.match.params.id} />
      ) : (
        <div></div>
      )}
    </Container>
  );
}

export default IOModule;
