import React, { Component } from 'react';
import {Navbar} from 'react-materialize'

export class Nav extends Component {
  render() {
    return (
        <Navbar brand='Event.me' right></Navbar>
    );
  }
}
