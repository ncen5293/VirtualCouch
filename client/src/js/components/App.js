import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './Home';
import LobbiesPage from './LobbiesPage';
import Lobby from './Lobby';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path = "/" component = {Home} />
          <Route exact path = "/watch" component = {LobbiesPage} />
          <Route exact path = "/watch/:roomId" component = {Lobby} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
