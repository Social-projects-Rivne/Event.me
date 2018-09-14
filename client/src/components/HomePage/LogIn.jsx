import React, { Component } from 'react';
import { Input, Button, Row } from 'react-materialize'
import { Link } from 'react-router-dom'
import { request, emailValidation, log_event } from '../../utils'


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

  logIn = (e) => {
    if (!emailValidation(this.state.email) || !this.state.password.length) {
      window.Materialize.toast("Invalid input", 3000);
      return 1;
    };
    const logInData = {
      email: this.state.email,
      password: this.state.password,
    };

    request('/log-in', 'POST', JSON.stringify(logInData))
    .then(data=>{
      if (typeof (Storage) === "undefined") {
        this.setState({ msg: "Your sessionStorage is not active" });
      } else {
        if (data.success) {
          sessionStorage.setItem("Authorization-token", data.token);
          sessionStorage.setItem("User-nickname", data.user.nickname);
          sessionStorage.setItem("User-avatar", data.user.avatar);
          sessionStorage.setItem("User-id", data.user.user_id);
          sessionStorage.setItem("User-role", data.user.user_role);
          window.dispatchEvent(log_event);
        } else {
          this.setState({ msg: data.msg });
          window.Materialize.toast(this.state.msg, 3000);
        }
      }
    });
  }

  render() {
    return (
      <div className="white">
        <Row>
          <Input
            id="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
            type="email"
            label="Email"
            s={12}
          />
        </Row>
        <Row>
          <Input
            id="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
            type="password"
            label="Password"
            s={12}
          />
          <Link className="forgot-password-link" to={"/recover"}>forgot password?</Link>
        </Row>
        <Button waves="light" onClick={this.logIn}>Sign In</Button>
      </div>
    );
  }
}

export default LogIn;
