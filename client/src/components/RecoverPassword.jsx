import React, { Component } from 'react';
import { Input, Button, Icon, Row, Col } from 'react-materialize';
import { emailValidation, request } from '../utils.js';
import { Route } from "react-router-dom";

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
            window.Materialize.toast("Invalid input", 3000)
            return null
        }
    request('/recover-password', "POST", JSON.stringify(recoverData))
         .then(data => {
         this.setState({ msg: data.msg })
         window.Materialize.toast(this.state.msg, 3000)
     })
   }
     render(){
        return (
            <Row>
                <Col offset="s4" s={5}>
                    <h3> RecoverPassword </h3>
                    <Input
                      id="email_recover"
                      value={ this.state.email_recover }
                      onChange={ this.onChangeHandler }
                      placeholder="Email"
                      type="email"
                      label="Email"
                    />
                    <Button waves='light' onClick={ this.sendMailRecoverPassword }>Send</Button>
                </Col>
            </Row>
        );}
}

export default RecoverPassword;
