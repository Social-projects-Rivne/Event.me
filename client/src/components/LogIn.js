import React, { Component } from 'react';
import { Input, Button, Icon} from 'react-materialize'
import { server_url } from '../config.json'

let myHeaders = new Headers();

export class LogIn extends Component {
  state = {
    email: '',
    password: '',
    msg: ''
  }

  onChangeHandler = (e) => {
    const { id } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  }

  log_in = (e) => {
    let log_in_data = {
      email: this.state.email,
      password: this.state.password
    }
    myHeaders.append('Content-Type', 'application/json')
    fetch(server_url + '/log-in', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(log_in_data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response: ', data)
        this.setState({ msg: data.msg })
        if (data.success) {
          if (typeof (Storage) !== "undefined") {
            if (typeof (data.token !== "undefined")) {
              sessionStorage.setItem("Authorization-token", data.token);
              sessionStorage.setItem("User-nickname", data.user.nickname);
              sessionStorage.setItem("User-avatar", data.user.avatar);
              this.props.update()
            }
            else this.setState({ msg: "Server give invalid response" })
          }
          else this.setState({ msg: this.state.msg + "\nYour sessionStorage is not active" })
        }
        else {
          this.setState({ msg: data.msg })
          alert(this.state.msg)
        }
      })
  }

  render() {
    return (
      <React.Fragment>
        <li><Icon>person</Icon></li>
        <li><Input id="email" value={this.state.email} onChange={this.onChangeHandler} type="email" label="Email" /></li>
        <li><Input id="password" value={this.state.password} onChange={this.onChangeHandler} type="password" label="Password" /></li>
        <li><Button large waves='light' onClick={this.log_in}>Log In</Button></li>
      </React.Fragment>
    );
  }
}
