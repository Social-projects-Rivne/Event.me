import React, { Component } from 'react';
import { NavItem } from 'react-materialize'
import {isLogged} from '../../utils'
import {Link} from 'react-router-dom'


class NavProfile extends Component {
  get_pictogram_url() {
    console.log(sessionStorage['User-id'])
    if (sessionStorage['User-avatar'] !== "null") {
      return sessionStorage['User-avatar']
    }
    else return '/person.jpg'
  }

  render() {
    return (
      <React.Fragment>
        {
          isLogged() ? (
            <NavItem><Link to={"/profile/" + sessionStorage['User-id']}>
              <img
                alt="user pictogram"
                className="user-pictogram"
                src={this.get_pictogram_url()}
              />
              &nbsp;
              {sessionStorage['User-nickname']}
            </Link></NavItem>
          ) : null
        }
      </React.Fragment>
    );
  }
}

export default NavProfile;
