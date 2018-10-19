import React from "react";

import { compose } from "recompose";

import { Route, Switch } from "react-router-dom";
import TopBar from "./TopBar";
import Home from "./Home";
import { NotFound } from "./views";

const App = ({}) => (
  <div className="App container">
    <TopBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default compose()(App);
