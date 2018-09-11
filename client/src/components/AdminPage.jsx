import React, { Component } from 'react';
import { Row, Col, Table, Button, Input } from 'react-materialize';
import { request } from '../utils';


class AdminPage extends Component {
  state = {
    users: []
  };


  componentDidMount() {
    request('/admin-page')
      .then(data => {
        this.setState({ users: data.users_dict });
      })
  }

  changeUserStatus = (e) => {
    let { id } = e.currentTarget;
    id = id.slice(5);
    const data = {
      "status_str": e.currentTarget.value
    }
    request(`/admin-page/${id}`, "PUT", JSON.stringify(data))
      .then(data => {
        if ('status' in data) {
          document.getElementById(`user-${id}`).value = data.status;
        }
      })
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
                  id={`user-${element.id}`}
                  onClick={this.changeUserStatus}
                  value={element.role_str}
                />

              </td>
              <td>
                <Input
                  type="button"
                  id={`user-${element.id}`}
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
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.renderUsersList()}
        </tbody>
      </Table>
    );
  }
}

export default AdminPage;
