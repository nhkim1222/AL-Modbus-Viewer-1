import React from "react";
import styled from "styled-components";
import IOInformation from "../Components/Module/IOInformation";
import { useInterval } from "../Hooks/useInterval";
const { ipcRenderer } = window.require("electron");

const Container = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;
function IOModule(id) {
  useInterval(() => {
    ipcRenderer.send("get-io-information", {io_id: id.match.params.id});
  },1500);

  return (
    <Container>
      <IOInformation id={id.match.params.id} />
    </Container>
  );
}

export default IOModule;
