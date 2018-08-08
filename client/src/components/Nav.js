import React, { Component } from 'react';
import {Navbar} from 'react-materialize'
import {LogIn} from './LogIn'
import {NavProfile} from './NavProfile'
import {LogOut} from './LogOut'


export class Nav extends Component {
  isLogged = () => (typeof(sessionStorage['Authorization-token']) !== 'undefined') ? true : false

  update = () => {
    this.forceUpdate()
  }

  render() {
    return (
        <Navbar brand='Event.me' right>
          {
            this.isLogged() ?
            <React.Fragment>
              <NavProfile isLogged={this.isLogged}/>
              <LogOut update={this.update} isLogged={this.isLogged}/>
            </React.Fragment>
            :
            <LogIn update={this.update}/>
          }
        </Navbar>
    );
  }
}
