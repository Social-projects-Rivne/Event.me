import React, { Component } from 'react';
import { Input, Button, Row } from 'react-materialize'
import {emailValidation, request} from '../../utils';
import {Home} from "../Home";

class Registration extends Component {
    state = {
        email: '',
        password: '',
        repeat_password: '',
        msg: ''
    };

    onChangeHandler = (e) => {
        let { id } = e.currentTarget
        this.setState({ [id]: e.currentTarget.value })
    };

    register = (e) => {
        let register_data = {
            email: this.state.email,
            password: this.state.password,
            repeat_password: this.state.repeat_password
        }
        if (!emailValidation(this.state.email) || !this.state.password.length || this.state.password !== this.state.repeat_password){
            window.Materialize.toast("Invalid input", 3000)
            return null
        }
        request('/registration',"POST", JSON.stringify(register_data))
            .then(data=>{
             this.setState({msg: data.msg})
             window.Materialize.toast(this.state.msg, 3000)
             setTimeout(this.props.history.push('/'), 3000)
            })
    }


    render() {
      return (
        <Row>
          <h3>Registration form</h3>
          <Input
            id="email"
            velue={this.state.email}
            onChange={this.onChangeHandler}
            placeholder="Email"
            type="email"
            label="Email"
            m={12}/>
          <Input
            id="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
            placeholder="Password"
            type="password"
            label="Password"
            m={12}/>
          <Input
            id="repeat_password"
            value={this.state.repeat_password}
            onChange={this.onChangeHandler}
            placeholder="Repeat password"
            type="password"
            label="Repeat password"
            m={12}/>
            <Button waves="light" onClick={this.register}>SignUp</Button>
        </Row>

        );}
    }


export default Registration;
