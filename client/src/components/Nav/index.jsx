import React, { Component } from 'react';
import { Navbar } from 'react-materialize';
import LogIn from './LogIn';
import NavProfile from './NavProfile';
import LogOut from './LogOut';
import {isLogged} from '../../utils'


class Nav extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update() {
    this.forceUpdate();
  };

  renderAuthFileds() {
    if (isLogged()) {
      return (
        <React.Fragment>
          <NavProfile isLogged={isLogged} />
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

export default Nav;
