import React, { Component } from 'react';
import { NavItem } from 'react-materialize'


export class NavProfile extends Component {
  get_pictogram_url() {
    if (sessionStorage['User-avatar'] !== "null") {
      return sessionStorage['User-avatar']
    }
    else return '/person.jpg'
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.isLogged() ? (
            <NavItem>
              <img
                alt="user pictogram"
                className="user-pictogram"
                src={this.get_pictogram_url()}
              />
              &nbsp;
              {sessionStorage['User-nickname']}
            </NavItem>
          ) : null
        }
      </React.Fragment>
    );
  }
}
