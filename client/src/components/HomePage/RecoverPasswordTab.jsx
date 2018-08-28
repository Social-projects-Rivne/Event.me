import React, { Component } from 'react';
import { Input, Button, Row, Tabs, Tab } from 'react-materialize';
import { emailValidation, request } from '../../utils.js';


export class RecoverPasswordTab extends Component {
  state = {
    email_recover: '',
    msg: '',
    check_email: '',
    success: false,
  }

  onChangeHandler = (e) => {
    let { id } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  };

  sendMailRecoverPassword = (e) => {
    let recoverData = {
      email: this.state.email_recover
    }
    if (!emailValidation(this.state.email_recover)) {
      this.setState({ check_email: 'Invalid' });
      window.Materialize.toast("Invalid input", 3000);
      return null;
    }
    request('/recover-password', "POST", JSON.stringify(recoverData))
      .then(data => {
        this.setState({ msg: data.msg });
        this.setState({ success: data.success });
        window.Materialize.toast(this.state.msg, 3000);
        if (this.state.success) {
          setTimeout(this.props.history.push('/recover-info'), 3000);
        }
      })
  }
  render() {
    return (
      <Tabs className="tabs tabs-fixed-width tab-demo z-depth-1">
        <Tab title="Recover Password" active>
          <div className="white">
            <Row>
              <Input
                id="email_recover"
                error={this.state.check_email}
                value={this.state.email_recover}
                onChange={this.onChangeHandler}
                s={12}
                type="email"
                label="Email"
              />
              <Button waves='light' onClick={this.sendMailRecoverPassword}>Reset password</Button>
            </Row>
          </div>
        </Tab>
      </Tabs>
    );
  }
}

export default RecoverPasswordTab;
