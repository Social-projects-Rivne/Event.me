import React, { Component } from 'react';
import { Navbar, Button } from 'react-materialize';
import LogIn from './LogIn';
import NavProfile from './NavProfile';
import LogOut from './LogOut';
import { isLogged } from '../../utils'


class Nav extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  routeChange(){

      window.location.hash = "/registration";

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
                  <Button onClick={this.routeChange = this.routeChange.bind(this)} waves="light">
                      Registration
                  </Button>
                 </React.Fragment>)
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
