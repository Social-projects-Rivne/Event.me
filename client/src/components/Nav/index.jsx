import React, { Component } from 'react';
import { Navbar, Button, Row } from 'react-materialize';
import { NavLink, Link, Redirect } from 'react-router-dom'
import NavProfile from './NavProfile';
import LogOut from './LogOut';
import { isLogged } from '../../utils'


class Nav extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        window.addEventListener('user-log', (e) => this.update());
    }

  update() {
    this.forceUpdate();
  }

  renderAuthFileds() {
    if (isLogged()) {
      return (
        <React.Fragment>
          <NavProfile isLogged={isLogged} />
          <LogOut update={this.update} />
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <Navbar brand="Event.me" right>
      <Row>
        {this.renderAuthFileds()}
        </Row>
      </Navbar>
    );
  }
}

export default Nav;
