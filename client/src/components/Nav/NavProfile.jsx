import React, { Component } from 'react';
import { isLogged } from '../../utils'
import { Link } from 'react-router-dom'


class NavProfile extends Component {
  get_pictogram_url() {
    if (sessionStorage['User-avatar'] !== "null") {
      return sessionStorage['User-avatar']
    }
    else return '/img/person.jpg'
  }

  render() {
    return (
      <React.Fragment>
        {
          isLogged() ? (
            <li>
              <Link to={"/profile/" + sessionStorage['User-id']}>
                <img
                  alt="user pictogram"
                  className="user-pictogram circle"
                  width="32"
                  src={this.get_pictogram_url()}
                />
                &nbsp;
              {sessionStorage['User-nickname']}
              </Link>
            </li>
          ) : null
        }
      </React.Fragment>
    );
  }
}

export default NavProfile;
