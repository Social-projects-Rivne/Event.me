import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'react-materialize';
import { emailValidation, request } from '../utils.js';


export class RecoverPassword extends Component {
    state = {
        email_recover: '',
        msg: ''
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
            window.Materialize.toast("Invalid input", 3000);
            return null;
        }
    request('/recover-password', "POST", JSON.stringify(recoverData))
         .then(data => {
         this.setState({ msg: data.msg });
         window.Materialize.toast(this.state.msg, 3000);
     })
   }
     render(){
        return (
        <div>
            <Row>
                <Col className="center-align" offset="s7" s={4}>
                    <h4> Reset Password </h4>
                    <Input
                      id="email_recover"
                      value={ this.state.email_recover }
                      onChange={ this.onChangeHandler }
                      s={12}
                      placeholder="Email"
                      type="email"
                      label="Email"
                    />
                </Col>
                <Col className="center-align" offset="s7" s={4}>
                    <Button waves='light' onClick={ this.sendMailRecoverPassword } > Reset password </Button>
                </Col>
            </Row>
          </div>
        );}
}

export default RecoverPassword;
