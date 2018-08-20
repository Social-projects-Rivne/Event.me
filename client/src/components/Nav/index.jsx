import React, { Component } from 'react';
import { Navbar, Button, NavItem, Row } from 'react-materialize';
import LogIn from './LogIn';
import NavProfile from './NavProfile';
import LogOut from './LogOut';
import { isLogged } from '../../utils'
import { NavLink, Link } from 'react-router-dom'



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
    else return (<React.Fragment><LogIn update={this.update} />
                  <Button waves="light">
                      <NavLink to='registration'>Registration</NavLink>
                  </Button>
                 </React.Fragment>)
  }

  renderNavRecover() {
    return (
      <React.Fragment>
        {
        <NavItem><Link to={"/recover"}>forgot password?</Link>
        </NavItem>
        }
      </React.Fragment>
    );
  }


  render() {
    return (
      <Navbar brand="Event.me " className=""  right>
      <Row>
        {this.renderNavRecover()}
        {this.renderAuthFileds()}
        </Row>
      </Navbar>
    );
  }
}

export default Nav;
