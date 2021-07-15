import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import IOModule from "../Router/IOModule";
import MainModule from "../Router/MainModule";
import Header from "./Header";

function Router() {
  return (
    <HashRouter>
      <>
        <Header></Header>
        <Switch>
          <Route path="/" exact component={MainModule} />
          <Route path="/IO/:id" component={IOModule} />
          <Redirect from="*" to="/" />
        </Switch>
      </>
    </HashRouter>
  );
}
export default Router;
