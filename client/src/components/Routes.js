import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {Home} from './Home';
import {LogIn} from './LogIn'

export class Routes extends Component {
  render() {
    return (
          <div className="content">
            <Route path="/" component={Home} exact/>
            <Route path="/log-in" component={LogIn} />
          </div>
    );
  }
}
