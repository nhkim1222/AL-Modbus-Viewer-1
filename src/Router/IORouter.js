import React, { useState, useEffect } from "react";
import { useInterval } from "../Hooks/useInterval";

import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import IOMenu from "../Components/Menu/IOMenu";
import IOModule from "./IOModule";
const { ipcRenderer } = window.require("electron");

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  background-color: white;
  color: black;
`;
function IORouter() {
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

  return (
    <Container>
      <IOMenu></IOMenu>
      <Route path="/IO" exact render={() => <div></div>}></Route>
      {isConnected && <Route path="/IO/:id" component={IOModule}></Route>}
    </Container>
  );
}

export default IORouter;
