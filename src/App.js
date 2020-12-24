import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Home from "./pages/Home";
import PlaintextFiles from "./pages/FileManager/FileManager";

function App() {
  return (
    <Router>
      {" "}
      <Paper>
        <Navbar />
        <div className="App">
          <header className="App-header">
            <Switch>
              <Route path="/file">
                <Home />
              </Route>
              <Route path="/">
                <PlaintextFiles />
              </Route>
            </Switch>
          </header>
        </div>
      </Paper>
    </Router>
  );
}

export default App;
