import React, { Component } from 'react';
import {HashRouter} from 'react-router-dom';
import {Nav} from './components/Nav';
import {Routes} from './components/Routes'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="wrapper">
          <Nav />
          <Routes />
        </div>
      </HashRouter>
    );
  }
}

export default App;
