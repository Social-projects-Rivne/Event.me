import React, { Component } from 'react';
import {Navbar} from 'react-materialize'
import {NavLink} from 'react-router-dom'
import {NavProfile} from './NavProfile'
import LogOut from './LogOut'


export class Nav extends Component {
  isLogged = () => (typeof(sessionStorage['Authorization-token']) !== 'undefined') ? true : false

  render() {
    return (
        <Navbar brand='Event.me' right>
          {
            this.isLogged() ?
            <React.Fragment>
              <NavProfile />
              <LogOut isLogged={this.isLogged}/>
            </React.Fragment>
            :
            <li><NavLink to='log-in'>Log In</NavLink></li>
          }
        </Navbar>
    );
  }
}
