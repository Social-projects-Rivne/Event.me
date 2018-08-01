import React, { Component } from 'react';
import {Navbar} from 'react-materialize'
import {NavLink} from 'react-router-dom';

export class Nav extends Component {
  render() {
    return (
        <Navbar brand='Even.me' right>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/log-in'>Log In</NavLink></li>
        </Navbar>
    );
  }
}
