import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'react-materialize'
import { request } from '../utils.js'
import {Route} from "react-router-dom";

export class ChangePassword extends Component {
    state = {
        new_password: '',
        check_new_password: ''
    }

    onChangeHandler = (e) => {
        let { id } = e.currentTarget
        this.setState({ [id]: e.currentTarget.value })
    };

    change_old_password = (e) => {
        if (this.state.new_password !== this.state.check_new_password) {
            window.Materialize.toast("Passwords do not match ", 3000);
            return 1;
        }
        let change_password_data = {
          password: this.state.new_password,
        }
        if (!this.state.new_password.length) {
            window.Materialize.toast("Invalid input", 3000)
            return null
        }
    request(`/change-password/${this.props.match.params.token}`, "POST", JSON.stringify(change_password_data))
         .then(data => {
         this.props.history.push('/');
     })
   }
     render(){
        return (
            <Row>
                <Col offset="s4" s={5}>
                    <h3> Change password </h3>
                    <Input
                      id="new_password"
                      value={this.state.new_password}
                      onChange={this.onChangeHandler}
                      placeholder="Password"
                      type="password"
                      label="password"
                    />
                    <Input
                      id="check_new_password"
                      value={this.state.check_new_password}
                      onChange={this.onChangeHandler}
                      placeholder="Confirm_password"
                      type="password"
                      label="confirm_password"
                    />
                    <Button waves='light' onClick={this.change_old_password}>Confirm</Button>
                </Col>
            </Row>
        );}
}

export default ChangePassword;
