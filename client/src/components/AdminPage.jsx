import React, { Component } from 'react';
import { Parallax, Row, Col, CardPanel, Icon, Chip } from 'react-materialize';
import { Link } from 'react-router-dom';
import { isEmpty, request } from '../utils';


class AdminPage extends Component {

componentDidMount() {
    request('/admin-page')
    .then(data => {
        data.user_dict;
    })
}

render() {
  return (
    <React.Fragment>
      <h1>This is Admin page</h1>
    </React.Fragment>
  );
}
}



export default AdminPage;
