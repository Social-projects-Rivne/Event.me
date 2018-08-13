import React, { Component } from 'react';
import { Input, Button, Icon } from 'react-materialize'
import { request, emailValidation } from '../../utils'

class LogIn extends Component {
  state = {
    email: '',
    password: '',
    msg: ''
  }

  onChangeHandler = (e) => {
    let { id } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }

  log_in = (e) => {
    let log_in_data = {
      email: this.state.email,
      password: this.state.password
    }
    if (!emailValidation(this.state.email) || !this.state.password.length) {
      window.Materialize.toast("Invalid input", 3000)
      return null
    }
    request('/log-in', 'POST', JSON.stringify(log_in_data))
    .then(data=>{
      console.log(data)
      if (typeof (Storage) === "undefined") {
        this.setState({ msg: "Your sessionStorage is not active" })
      }
      else {
        if (data.success) {
          sessionStorage.setItem("Authorization-token", data.token);
          sessionStorage.setItem("User-nickname", data.user.nickname);
          sessionStorage.setItem("User-avatar", data.user.avatar);
          sessionStorage.setItem("User-id", data.user.user_id);
          this.props.update()
        }
        else {
          this.setState({ msg: data.msg })
          window.Materialize.toast(this.state.msg, 3000)
        }
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <li>
          <Icon>person</Icon>
        </li>
        <li>
          <Input
            id="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
            type="email"
            label="Email"
          />
        </li>
        <li>
          <Input
            id="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
            type="password"
            label="Password"
          />
        </li>
        <li>
          <Button waves="light" onClick={this.log_in}>Log In</Button>
        </li>
      </React.Fragment>
    );
  }
}

export default LogIn;
