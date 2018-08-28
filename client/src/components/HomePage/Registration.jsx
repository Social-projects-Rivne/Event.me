import React, { Component } from 'react';
import { Input, Button, Row } from 'react-materialize'
import { emailValidation, request } from '../../utils';

class Registration extends Component {
  state = {
    email: '',
    nickname: '',
    password: '',
    repeat_password: '',
    msg: '',
    check_email: false,
    check_nickname: false,
    check_password: false
  };

  onChangeHandler = (e) => {
    let { id } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  };

  register = (e) => {
    let registerData = {
      email: this.state.email,
      nickname: this.state.nickname,
      password: this.state.password,
      repeat_password: this.state.repeat_password,
    }
    if (
      !emailValidation(this.state.email)
      || !this.state.password.length
      || this.state.password !== this.state.repeat_password
    ) {
      this.setState({ check_password: "passwords isn't equal" })
      window.Materialize.toast("Invalid input", 3000)
      return null
    }
    request('/registration', "POST", JSON.stringify(registerData))
      .then(data => {
        this.setState({ msg: data.msg })
        if (
          this.state.msg === "Your email address is already registered"
        ) {
          this.setState({ check_email: 'invalid email' })
          window.Materialize.toast(this.state.msg, 3000)
          setTimeout(this.props.history.push('/registration'), 3000)
          return null
        } else if (
          this.state.msg === "Your nickname is taken, please choose another"
        ) {
          this.setState({ check_nickname: 'invalid nickname' })
          window.Materialize.toast(this.state.msg, 3000)
          setTimeout(this.props.history.push('/registration'), 3000)
          return null
        } else {
          window.Materialize.toast(this.state.msg, 3000)
          setTimeout(this.props.history.push('/'), 3000)
          return null
        }
      })
  }


  render() {
    return (
      <div className="white">
        <Row>
          <Input
            id="nickname"
            error={this.state.check_nickname}
            validate value={this.state.nickname}
            onChange={this.onChangeHandler}
            label="Nickname"
            s={12} />
        </Row>
        <Row>
          <Input
            id="email"
            error={this.state.check_email}
            validate value={this.state.email}
            onChange={this.onChangeHandler}
            type="email"
            label="Email"
            s={12} />
        </Row>
        <Row>
          <Input
            id="password"
            error={this.state.check_password}
            validate value={this.state.password}
            onChange={this.onChangeHandler}
            type="password"
            label="Password"
            s={12} />
        </Row>
        <Row>
          <Input
            id="repeat_password"
            error={this.state.check_password}
            validate value={this.state.repeat_password}
            onChange={this.onChangeHandler}
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
