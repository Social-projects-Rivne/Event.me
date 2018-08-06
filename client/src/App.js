import React, { Component } from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Home} from './components/Home';
import {Nav} from './components/Nav'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="wrapper">
          <Nav />
          <div className="content">
            <Route path="/" component={Home} exact/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
