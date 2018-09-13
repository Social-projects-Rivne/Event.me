import React, { Component } from 'react';
import { Table, Input } from 'react-materialize';
import { request, momentUTCToLocal } from '../utils';


class AdminPageUsers extends Component {
  state = {
    users: [],
    roles: [],
    statuses: [],
    not_active_id: ""
  };

  componentDidMount() {
    request('/admin-page/users')
      .then(data => {
        this.setState({
          users: data.users_dict,
          roles: data.roles_dict,
          statuses: data.statuses_dict
          });
    })
    this.state.statuses.map((element) => {
      if (element.status === "Not_active") {
        return (
          this.setState({not_active_id: element.id })
        );
      } else return 0;

    })
  }

  changeUserRole = (e) => {
    let { id } = e.currentTarget;
    id = id.replace(/user-role-/g, '')
    const data = {
      "role_id": e.currentTarget.value
    }
    request(`/admin-page/users/${id}`, "PUT", JSON.stringify(data))
      .then(data => {
        if ('role_id' in data) {
          let users_arr = this.state.users;
          for(let i = 0; i < users_arr.length; i++) {
            if (users_arr[i].id === parseInt(id,10)) {
              users_arr[i].role_id = data['role_id']
            }
          }
          this.setState({
            users: users_arr
          })
        }
      })
  }
  changeUserStatus = (e) => {
    let { id } = e.currentTarget;
    id = id.replace(/user-role-/g, '')
    const data = {
      "status_id": e.currentTarget.value
    }
    request(`/admin-page/users/${id}`, "PUT", JSON.stringify(data))
      .then(data => {
        if ('status_id' in data) {
        let users_arr = this.state.users;
        for(let i = 0; i < users_arr.length; i++) {
          if (users_arr[i].id === parseInt(id,10)) {
            users_arr[i].status_id = data['status_id']
          }
        }
        this.setState({
          users: users_arr
        })
        }
      })
  }

  renderRolelist() {
    return (
      <React.Fragment>
        {this.state.roles.map((element) => {
          return (
            <option value={element.id}>{element.role}</option>
          );
        })
      }
    </React.Fragment>
    )
  }

  renderStatuslist() {
    return (
      <React.Fragment>
        {this.state.statuses.map((element) => {
          if (element.status !== 'Non_active') {
            return (<option value={element.id}>{element.status}</option>);
          } else return 0;
        })
        }
      </React.Fragment>
    )
  }

  renderUsers() {
    return (
      <React.Fragment>
        {this.state.users.map((element) => {
          return (
            <tr>
              <td>{element.id}</td>
              <td>{element.email}</td>
              <td>{element.nickname}</td>
              <td>{momentUTCToLocal(element.create_date).format('MMMM D, YYYY HH:mm')}</td>
              <td>
                <Input s={12}
                  type='select'
                  id={`user-role-${element.id}`}
                  label="Materialize Select"
                  value={element.role_id}
                  onChange={this.changeUserRole}>
                  <option value='0' disabled>Default</option>
                  {this.renderRolelist()}
                </Input>
              </td>
              {(element.status_id !== this.state.not_active_id) ?
                <td>
                  <Input s={12}
                    type='select'
                    id={`user-${element.id}`}
                    label="Materialize Select"
                    value={element.status_id}
                    onChange={this.changeUserStatus}>
                    <option value='0' disabled>Default</option>
                    {this.renderStatuslist()}
                  </Input>
                </td> :
                <td>Non Active</td>
              }
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
          {this.renderUsers()}
        </tbody>
      </Table>
    );
  }
}

export default AdminPageUsers;
