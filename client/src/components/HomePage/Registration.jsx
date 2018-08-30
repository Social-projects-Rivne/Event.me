import React, { Component, ReactDOM } from 'react';
import { Input, Button, Row } from 'react-materialize';
import { emailValidation, request } from '../../utils';


class Registration extends Component {
  state = {
    email: '',
    nickname: '',
    password: '',
    repeat_password: '',
    msg: '',
    check_email: '',
    check_nickname: '',
    check_password: '',
  };

  onChangeHandler = (e) => {
    let { id } = e.currentTarget;
    this.setState({ [id]: e.currentTarget.value });
    if (
      this.state.password === this.state.repeat_password
    ) {
      this.setState({ check_password: "" });
    } else {
    this.setState({ check_password: "passwords isn't equal" });
    }
    }

    onChangePasswordError = (e) => {
    let { id } = e.currentTarget;
    this.setState({ [id]: e.currentTarget.value });
      if (
        e.currentTarget.value === this.state.repeat_password
      ) {
        this.setState({ check_password: "" });
      } else {
      this.setState({ check_password: "passwords isn't equal" });
      }
      }


  register = (e) => {
    let registerData = {
      email: this.state.email,
      nickname: this.state.nickname,
      password: this.state.password,
      repeat_password: this.state.repeat_password,
    };

    if (
      !emailValidation(this.state.email)
      || !this.state.password.length
      || this.state.password !== this.state.repeat_password
    ) {
      this.setState({ check_password: "passwords isn't equal" });
      window.Materialize.toast("Invalid input", 3000);
      return null;
    }

    request('/registration', "POST", JSON.stringify(registerData))
      .then(data => {
        this.setState({ msg: data.msg });
        window.Materialize.toast(this.state.msg, 3000);

        if ('error' in data) {
          this.setState({ [`check_${data.error}`]: `Invalid ${data.error}` })
          return null;

        } else {
        window.location.reload();

          return null;
        }
      })
  }


  render() {
    return (
      <div className="white" id="registration-container">
        <Row>
          <Input
            id="nickname"
            ref={el => this.inputNickname = el}
            error={this.state.check_nickname}
            value={this.state.nickname}
            onChange={this.onChangeHandler}
            label="Nickname"
            s={12} />
        </Row>
        <Row>
          <Input
            id="email"
            error={this.state.check_email}
            value={this.state.email}
            onChange={this.onChangeHandler}
            type="email"
            label="Email"
            s={12} />
        </Row>
        <Row>
          <Input
            id="password"
            error={this.state.check_password}
            value={this.state.password}
            onChange={this.onChangePasswordError}

            type="password"
            label="Password"
            s={12} />
        </Row>
        <Row>
          <Input
            id="repeat_password"
            error={this.state.check_password}
            value={this.state.repeat_password}
            onChange={this.onChangePasswordError}
            type="password"
            label="Repeat password"
            s={12} />
        </Row>
        <Button waves="light" onClick={this.register}>Sign Up</Button>
      </div>
    );
  }
}


export default Registration;
