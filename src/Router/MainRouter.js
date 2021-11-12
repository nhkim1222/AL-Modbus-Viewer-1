import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import LMInformation from "../Components/Main/LMInformation";
import LMMenu from "../Components/Menu/LMMenu";
import MainModule from "./MainModule";
import LMDigitalInput from "../Components/Main/LMDigitalInput";
import LMInformationContainer from "../Components/Main/Container/LMInformationContainer";
import LMStatusContainer from "../Components/Main/Container/LMStatusContainer";
import { useInterval } from "../Hooks/useInterval";
import LMCommonSetup from "../Components/Main/LMCommonSetup";
import LMSetupContainer from "../Components/Main/Container/LMSetupContainer";
import LMEvents from "../Components/Main/LMEvents";
import LMLogicSetup from "../Components/Main/LMLogicSetup";
import IODIOSetup from "../Components/Module/IODIOSetup";
const { ipcRenderer } = window.require("electron");
const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  background-color: white;
  overflow-y: scroll;
  color: black;
`;

function MainRouter({ match }) {
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

  useInterval(() => {
    if (isConnected) {
      ipcRenderer.send("request-lm-data", false);
    }
  }, 1500);

  return (
    <Container>
      <LMMenu></LMMenu>
      <Route path="/LM" exact render={() => <div></div>}></Route>
      {isConnected && (
        <Route
          path="/LM/information"
          component={LMInformationContainer}
        ></Route>
      )}
      {isConnected && (
        <Route path="/LM/status" component={LMStatusContainer}></Route>
      )}
      {isConnected && (
        <Route path="/LM/setup" component={LMSetupContainer}></Route>
      )}
      {isConnected && <Route path="/LM/event" component={LMEvents}></Route>}
      {isConnected && <Route path="/LM/LOGIC Setup" component={LMLogicSetup}></Route>}
      {isConnected && <Route path="/LM/IO Setup" component={IODIOSetup}></Route>}
    </Container>
  );
}

export default MainRouter;
