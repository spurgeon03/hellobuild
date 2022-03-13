import React from "react";
import { Favorites } from "../Favorites";
import { Profile } from "../Profile";
import { Home } from "../Home";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

const App = () => (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
        </Switch>
    </Router>
);

export { App };