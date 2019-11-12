import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './Home';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path = "/" component = {Home} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
