import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'react-materialize';
import { request } from '../utils.js';


export class ChangePassword extends Component {
    state = {
        new_password: '',
        check_new_password: '',

    };

    onChangeHandler = (e) => {
        let { id } = e.currentTarget
        this.setState({ [id]: e.currentTarget.value })
    };

    changeOldPassword = (e) => {
        if (this.state.new_password !== this.state.check_new_password) {
            window.Materialize.toast("Passwords do not match ", 3000);
            return 1;
        }
        const changePasswordData = {
          password: this.state.new_password,
        };
        if (!this.state.new_password.length) {
            window.Materialize.toast("Invalid input", 3000);
            return null;
        }
    request(`/change-password/${ this.props.match.params.token }`, "POST", JSON.stringify(changePasswordData))
         .then(data => {
         this.setState({ msg: data.msg });
         window.Materialize.toast(this.state.msg, 3000);
         setTimeout(this.props.history.push('/'), 3000);
     })
   }
     render(){
        return (
            <Row>
                <Col className="center-align" offset="s7" s={4}>
                    <h4> New password </h4>
                    <Input
                      id="new_password"
                      value={ this.state.new_password }
                      size={40}
                      onChange={ this.onChangeHandler }
                      placeholder="Password"
                      type="password"
                      label="new password"
                    />
                    <Input
                      id="check_new_password"
                      value={ this.state.check_new_password}
                      size={40}
                      onChange={ this.onChangeHandler }
                      placeholder="Confirm Password"
                      type="password"
                      label="confirm Password"
                    />
                    </Col>
                <Col className="center-align" offset="s7" s={4}>
                    <Button waves='light' onClick={ this.changeOldPassword }>Confirm</Button>
                </Col>
            </Row>
        );}
}

export default ChangePassword;
