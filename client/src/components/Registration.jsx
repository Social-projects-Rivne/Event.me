import React, { Component } from 'react';
import { Input, Button, Icon, Row } from 'react-materialize'
import { request } from '../scripts'
import {Home} from "./Home";
import {Route} from "react-router-dom";

export class Registration extends Component {
    state = {
        email: '',
        password: ''
    }

    render(){
        return (
            <Row>
                <h3 >Registration form</h3>
                <Input placeholder="Email" type="email" label="email" m={6} />
                <Input placeholder="Password" type="password" label="password" m={6} />
                <Button waves="light" onClick={this.log_in}>SignUp</Button>
            </Row>

        )}
}