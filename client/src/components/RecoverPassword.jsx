import React, { Component } from 'react';
import { Input, Button, Icon, Row } from 'react-materialize'
import { request } from '../scripts'
import {Home} from "./Home";
import {Route} from "react-router-dom";

export class RecoverPassword extends Component {
    state = {
        email: ''
    }

    render(){
        return (
            <Row>
                <Input type="email" label="Email" s={12} />
            </Row>
        )}
}
