import React, { Component } from 'react';
import {Navbar, NavItem} from 'react-materialize'

export class Nav extends Component {
  render() {
    return (
        <Navbar brand='Even.me' right>
            <NavItem href='/'>Home</NavItem>
            <NavItem href='/log-in'>Log In</NavItem>
        </Navbar>
    );
  }
}
