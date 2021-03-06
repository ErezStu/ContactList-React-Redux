import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <Navbar />
      <Switch>
        <Route path="/" exact component={() => <Home />} />
        <Route path="/add" component={AddContact} />
        <Route path="/edit/:id" component={EditContact} />
      </Switch>
    </div>
  );
};

export default App;
