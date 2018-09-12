import React, { Component } from 'react';
import { Row, Col, Table, Button, Input } from 'react-materialize';
import { Link } from 'react-router-dom';
import { request } from '../utils';


class AdminPage extends Component {

  render() {
    return (
      <React.Fragment>
        <Link to="/admin-page/users" className="btn waves-effect waves-light btn-flat">Users</Link>
        <Link to="/" className="btn waves-effect waves-light btn-flat">Events</Link>
      </React.Fragment>
    );
  }
}

export default AdminPage;
