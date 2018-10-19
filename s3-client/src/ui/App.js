import React from "react";

import { compose } from "recompose";

import { Route, Switch } from "react-router-dom";
import TopBar from "./TopBar";
import Home from "./Home";
import TimerView from "./timer/TimerView";
import { NotFound } from "./views";

const App = () => (
  <div className="App container">
    <TopBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/timer" component={TimerView} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default compose()(App);
