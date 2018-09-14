import React, { Component } from 'react';
import { Navbar } from 'react-materialize';
import { Link } from 'react-router-dom';
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

  renderAdminPageLink() {
    if (isLogged()) {
      if (sessionStorage['User-role'] === 'admin') {
        return (
          <React.Fragment>
            <Link to="/admin-page/">Admin Page</Link>
          </React.Fragment>
        );
      }
    }
  }

  render() {
    return (
      <Navbar brand="Event.me" right>
      <li>
        {this.renderAdminPageLink()}
      </li>
      <li>
        <Link to="/map">Map</Link>
      </li>
        {this.renderAuthFileds()}
      </Navbar>
    );
  }
}

export default Nav;
