import React, { Component } from 'react';
import { Navbar } from 'react-materialize';
import { LogIn } from './LogIn';
import { NavProfile } from './NavProfile';
import { LogOut } from './LogOut';


export class Nav extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  isLogged() {
    return typeof (sessionStorage['Authorization-token']) !== 'undefined' ? true : false
  };

  update() {
    this.forceUpdate();
  };

  renderAuthFileds() {
    if (this.isLogged()) {
      return (
        <React.Fragment>
          <NavProfile isLogged={this.isLogged} />
          <LogOut update={this.update} />
        </React.Fragment>
      )
    }
    else return <LogIn update={this.update} />
  }

  render() {
    return (
      <Navbar brand="Event.me" right>
        {this.renderAuthFileds()}
      </Navbar>
    );
  }
}
