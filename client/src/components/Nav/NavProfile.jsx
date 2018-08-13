import React, { Component } from 'react';
import { NavItem } from 'react-materialize'
import {isLogged} from '../../utils'


class NavProfile extends Component {
  get_pictogram_url() {
    if (sessionStorage['User-avatar'] !== "null") {
      return sessionStorage['User-avatar']
    }
    else return '/person.jpg'
  }

  constuctor() {
    this.routeChange = this.routeChange.bind(this);
   }

   routeChange(){
      window.location.hash = "/profile/" + sessionStorage['User-id'];
    }

  render() {
    return (
      <React.Fragment>
        {
          isLogged() ? (
            <NavItem onClick={this.routeChange}>
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

export default NavProfile;
