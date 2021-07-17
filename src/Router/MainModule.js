import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LDInformation from "../Components/Main/LDInformation";
import LMDigitalInput from "../Components/Main/LMDigitalInput";
import LMDigitalOutput from "../Components/Main/LMDigitalOutput";
import LMInformation from "../Components/Main/LMInformation";
import A2750LMSetup from "../Components/Main/LMSetup";
import { useInterval } from "../Hooks/useInterval";
import { map } from "../Modbus/RegisterMap";
const { ipcRenderer } = window.require("electron");

const Container = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;

function MainModule() {
  useInterval(() => {
    ipcRenderer.send("get-lm-information", false);
    ipcRenderer.send("get-lm-information", true);
    ipcRenderer.send("get-ld-information", false);
    ipcRenderer.send("get-ld-information", true);
    ipcRenderer.send("get-lm-di-status");
    ipcRenderer.send("get-lm-do-status");
  }, 1500);

  return (
    <Container>
      <LMInformation partner={false} />
      <LMInformation partner={true} />
      <LDInformation />
      <LDInformation partner={true} />
      <LMDigitalInput />
      <LMDigitalOutput />
      {/* <A2750LMSetup /> */}
    </Container>
  );
}

export default MainModule;
