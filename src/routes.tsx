import React from "react";
import { Switch, Route } from "react-router-dom";

import Client from "./pages/Client";
import ManageClients from "./pages/ManageClients";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Client} />
      <Route path="/new" exact component={ManageClients} />
      <Route path="/edit/:id" exact component={ManageClients} />
    </Switch>
  );
};

export default Routes;
