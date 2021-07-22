import React, { useState } from "react";
import styled from "styled-components";
import PCDigitalInput from "../Components/Module/PCDigitalInput";
import PCOutputStatus from "../Components/Module/PCOutputStatus";
import PCDigitalOutput from "../Components/Module/PCDigitalOutput";
import PCFaultStatus from "../Components/Module/PCFaultStatus";
import PCStatus from "../Components/Module/PCStatus";
import PCMeasureStatus from "../Components/Module/PCMeasureStatus";
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

function PCModule(id) {
  useInterval(() => {
    ipcRenderer.send("get-pc-di-status", { pc_id: id.match.params.id });
    ipcRenderer.send("get-pc-do-status", { pc_id: id.match.params.id });
    ipcRenderer.send("get-pc-falut-status", { pc_id: id.match.params.id });
    ipcRenderer.send("get-pc-status", { pc_id: id.match.params.id });
    ipcRenderer.send("get-pc-ai-status", { pc_id: id.match.params.id });
  }, 300);

  return (
    <Container>
        <PCDigitalInput id={id.match.params.id} />
        <PCOutputStatus id={id.match.params.id} />
        <PCDigitalOutput id={id.match.params.id} />
        <PCFaultStatus id={id.match.params.id} />
        <PCStatus id={id.match.params.id} />
        <PCMeasureStatus id={id.match.params.id} />
    </Container>
  );

}

export default PCModule;
