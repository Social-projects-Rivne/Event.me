import React, { Component } from 'react';
import { Navbar, Button, Row } from 'react-materialize';
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
        <li><Link to={"/recover"}>forgot password?</Link>
        </li>
        }
      </React.Fragment>
    );
  }


  render() {
    return (
      <Navbar brand="Event.me " right>
      <Row>
        {this.renderNavRecover()}
        {this.renderAuthFileds()}
        </Row>
      </Navbar>
    );
  }
}

export default Nav;
