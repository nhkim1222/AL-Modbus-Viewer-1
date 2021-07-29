import React, { useState, useEffect } from "react";
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

function IOModule(id) {
  const [info, setInformation] = useState({
    operationMode: 0,
    moduleType: 0,
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    ipcRenderer.on("server-connection-state", (evt, isConnected) => {
      if (isConnected === false) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
    });
  }, []);
  usePolling("set-io-information", setInformation);
  useInterval(() => {
    if (isConnected) {
      ipcRenderer.send("request-io-data", {io_id: id.match.params.id});
    }
  }, 1500);
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
