import React from "react";
import styled from "styled-components";
import IODigitalInput from "../Components/Module/IODigitalInput";
import IOInformation from "../Components/Module/IOInformation";
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

function IOModule(id) {
  useInterval(() => {
    ipcRenderer.send("get-io-information", {io_id: id.match.params.id});
    ipcRenderer.send("get-io-di-status", {io_id: id.match.params.id});
  },1500);

  return (
    <Container>
      <IOInformation id={id.match.params.id} />
      <IODigitalInput id={id.match.params.id}/>
    </Container>
  );
}

export default IOModule;
