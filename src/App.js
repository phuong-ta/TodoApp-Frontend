import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";

import Login from './Components/Auth/Login';
import ListTask from './Components/Task/ListTask'
import ListCompany from "./Components/Company/ListCompany";
import ListUser from "./Components/User/ListUser";
import Header from "./Components/Header/Header";

function App() {
  const token = sessionStorage.getItem('token');
  if (token) {
    return (
      <div className="App">
        <Router>
        <Header></Header>
        <div>
          <Switch>
            <Route path="/TodoList">
              <ListTask />
            </Route>
  
            <Route path="/Company">
              <ListCompany />
            </Route>
  
            <Route path="/User">
              <ListUser />
            </Route>

          </Switch>
        </div>
      </Router>
      </div>
    );
  } return (
      <div className="App">
        <Router>
        <div>
          <Switch>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
      </div>
    );
}






export default App;
