import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Home} from './components/Home';
import {LogIn} from './components/LogIn';
import {Nav} from './components/Nav'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div class="wrapper">
          <Nav />
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/log-in" component={LogIn} />
            <Route render={() => <p>Not Found</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
