import React, { Component } from 'react';
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

    onChangeHandlerPassword = (e) => {
    let { id } = e.currentTarget;
    this.setState({ [id]: e.currentTarget.value },
    () => {
      if (this.state.password === this.state.repeat_password) this.setState({ check_password: "" });
      else {
        this.setState({ check_password: "passwords isn't equal" });
      }
    });
    }

    onChangeHandlerNickname = (e) => {
    let { id } = e.currentTarget;
    this.setState({ [id]: e.currentTarget.value },
    () => {
      if (!this.state.nickname.length) {
        this.setState({ check_nickname: "Empty field" });
      } else {
        this.setState({ check_nickname: "" });
      }
    });
    }

    onChangeHandlerEmail = (e) => {
    let { id } = e.currentTarget;
    this.setState({ [id]: e.currentTarget.value },
    () => {
      if (!emailValidation(this.state.email)) {
        this.setState({ check_email: "Invalid email" });
      } else {
        this.setState({ check_email: "" });
      }
    });
    }

  register = (e) => {
    let registerData = {
      email: this.state.email,
      nickname: this.state.nickname,
      password: this.state.password,
      repeat_password: this.state.repeat_password,
    };

    if (!this.state.password.length) {
      this.setState({ check_password: "Empty field" });
      window.Materialize.toast("Invalid input", 3000);
    }
    if (!emailValidation(this.state.email)) {
      this.setState({ check_email: "Invalid email" });
    }
    if (!this.state.nickname.length) {
      this.setState({ check_nickname: "Empty field" });
      window.Materialize.toast("Invalid input", 3000);
    }
    if (
      !this.state.password.length
      || !emailValidation(this.state.email)
      || !this.state.nickname.length
    ) return null;

    request('/registration', "POST", JSON.stringify(registerData))
      .then(data => {
        this.setState({ msg: data.msg });
        window.Materialize.toast(this.state.msg, 3000);

        if ('error' in data) {
          this.setState({ [`check_${data.error}`]: `Invalid ${data.error}` })
          return null;
        } else {
          window.Materialize.toast("Check your email box", 3000);
          window.history.forward('/registration-info');
        }
      });
  }


  render() {
    return (
      <div className="white">
        <Row>
          <Input
            id="nickname"
            error={this.state.check_nickname}
            value={this.state.nickname}
            onChange={this.onChangeHandlerNickname}
            label="Nickname"
            s={12} />
        </Row>
        <Row>
          <Input
            id="email"
            error={this.state.check_email}
            value={this.state.email}
            onChange={this.onChangeHandlerEmail}
            type="email"
            label="Email"
            s={12} />
        </Row>
        <Row>
          <Input
            id="password"
            error={this.state.check_password}
            value={this.state.password}
            onChange={this.onChangeHandlerPassword}
            type="password"
            label="Password"
            s={12} />
        </Row>
        <Row>
          <Input
            id="repeat_password"
            error={this.state.check_password}
            value={this.state.repeat_password}
            onChange={this.onChangeHandlerPassword}
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
