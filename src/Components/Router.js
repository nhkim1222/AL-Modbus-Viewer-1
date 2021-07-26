import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import IOModule from "../Router/IOModule";
import PCModule from "../Router/PCModule";
import MainModule from "../Router/MainModule";
import DeviceController from "./DeviceController";
import Header from "./Header";
import MainRouter from "../Router/MainRouter";
import IORouter from "../Router/IORouter";

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: white;
  flex-grow: 12;
`;
const ContainerLeft = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  flex-grow: 0;
`;
const TopLeft = styled.div`
  flex-shrink: 0;
  height: 60px;
  padding-left: 183px;
  background-color: #344b67;
`;
const TopRight = styled.div`
  flex-shrink: 0;
  display: inline-flex;
`;

const Left = styled.div`
  flex-shrink: 0;
`;
const Bottom = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  background-color: #4c627b;
`;
const UL = styled.ul`
  display: inline-flex;
  list-style: none;
  margin: 0;
`;

function Router() {
  return (
    <HashRouter>
      <ContainerLeft>
        <TopLeft></TopLeft>
        <Bottom>
          <DeviceController />
        </Bottom>
      </ContainerLeft>
      <Container>
        <Header></Header>
        {/* <Switch> */}
        <Route path="/LM" component={MainRouter} />
        <Route path="/PC/:id" component={PCModule} />
        <Route path="/IO" component={IORouter} />
        {/* </Switch> */}
      </Container>
    </HashRouter>
  );
}
export default Router;
