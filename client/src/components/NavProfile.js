import React, { Component } from 'react';
import {NavItem} from 'react-materialize'


export class NavProfile extends Component {
  render() {
    return (
        <React.Fragment>
            {this.props.isLogged() ? <NavItem>Hello, {sessionStorage['User-nickname']}</NavItem> : null}
        </React.Fragment>
    );
  }
}
