import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LDInformation from "../Components/Main/LDInformation";
import LMDigitalInput from "../Components/Main/LMDigitalInput";
import LMDigitalOutput from "../Components/Main/LMDigitalOutput";
import LMInformation from "../Components/Main/LMInformation";
import A2750LMSetup from "../Components/Main/LMSetup";
import { useInterval } from "../Hooks/useInterval";
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
function MainModule() {
  // TODO : connection 상태를 이용한 데이터 리퀘스트 훅 만들기.
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    ipcRenderer.on("server-connection-state", (evt, isConnected) => {
      if (isConnected === false) {
        setConnected(false);
      } else {
        setConnected(true);
      }
    });
  }, []);

  useInterval(() => {
    if (connected) {
      ipcRenderer.send("get-lm-information", false);
      ipcRenderer.send("get-lm-information", true);
      ipcRenderer.send("get-ld-information", false);
      ipcRenderer.send("get-ld-information", true);
      ipcRenderer.send("get-lm-di-status");
      ipcRenderer.send("get-lm-do-status");
      ipcRenderer.send("get-mismatch-alarm");
    }
  }, 1500);

  return (
    <Container>
      <ContainerChild>
        {connected ? <LMInformation partner={false} /> : <></>}
        {connected ? <LMInformation partner={true} /> : <></>}
      </ContainerChild>
      <ContainerChild>
        <LDInformation />
        <LDInformation partner={true} />
      </ContainerChild>
      <ContainerChild>
        <LMDigitalInput />
        <LMDigitalOutput />
      </ContainerChild>
    </Container>
  );
}

export default MainModule;
