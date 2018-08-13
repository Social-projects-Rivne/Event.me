import React, { Component } from 'react'
import { NavItem } from 'react-materialize'
import { request, log_event } from '../../utils'


class LogOut extends Component {
  state = {
    msg: ''
  }

  log_out = (e) => {
    e.preventDefault();
    request('/log-out', 'POST')
      .then(data => {
        if (data.success) {
          sessionStorage.removeItem('Authorization-token');
          sessionStorage.removeItem('User-nickname');
          sessionStorage.removeItem('User-avatar');
          this.props.update();
          window.dispatchEvent(log_event);
        } else {
          this.setState({ msg: data.msg });
        };

        window.Materialize.toast(this.state.msg, 3000);
    });
  }

  render() {
    return <NavItem onClick={this.log_out}>Log Out</NavItem>
  }
}

export default LogOut;
