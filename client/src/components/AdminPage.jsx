import React, { Component } from 'react';
import { Parallax, Row, Col, CardPanel, Icon, Chip, Table, Button, Input } from 'react-materialize';
import { Link } from 'react-router-dom';
import { isEmpty, request } from '../utils';


class AdminPage extends Component {
  state = {
    users: [],
    statuses: []
  };


componentDidMount() {
    request('/admin-page')
    .then(data => {
      this.setState({users: data.users_dict});
    })
}

changeUserStatus = (e) => {
  {this.state.users.map((element) => {
  if (element.nickname + element.id === e.currentTarget.id) {
    if (e.currentTarget.value === "Banned") {
      element.status_id = '1'
      element.status_str = "Active"
      e.currentTarget.value = element.status_str
      const data = {
            "nickname": element.nickname,
            "status_id": element.status_id
      }

      request(`/admin-page/`, "POST", JSON.stringify(data))
           .then(data => {

       })
    } else if (e.currentTarget.value === "Active") {
      element.status_id = '2'
      element.status_str = "Banned"
      e.currentTarget.value = element.status_str
      const data = {
            "user_id": element.id,
            "status_id": element.status_id
      }

      request(`/admin-page/`, "POST", JSON.stringify(data))
           .then(data => {

       })
    }

  }
  return null;
  }
  )}
  }

  confirmUsersChange = (e) => {

 }


renderUsersList() {

return (
  <React.Fragment>
    {this.state.users.map((element) => {
          return (
          <tr>
            <td>{element.id}</td>
            <td>{element.email}</td>
            <td>{element.nickname}</td>
            <td>{element.create_date}</td>
            <td>
              <Input
                type="button"
                id={element.nickname + element.id}
                onClick={this.changeUserStatus}
                value={element.status_str}
            />

            </td>
          </tr>
          );
        }
        )}

  </React.Fragment>
);

}
render() {
  return (
  <Table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Email</th>
      <th>Nickname</th>
      <th>Registration date</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>
    {this.renderUsersList()}
    <Button waves='light' onClick={ this.confirmUsersChange }>Confirm</Button>
  </tbody>
</Table>
  );
}
}



export default AdminPage;
