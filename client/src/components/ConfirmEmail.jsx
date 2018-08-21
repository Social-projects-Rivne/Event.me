import React, { Component } from 'react';
import { request } from '../utils';
import {Button} from "react-materialize";

class ConfirmEmail extends Component{
    state = {
        msg: ''
    }

    componentDidMount(){
        request('/email_confirm/'+this.props.match.params.token)
            .then(data=>{
                this.setState({msg: data.msg})
                window.Materialize.toast(this.state.msg, 3000)
            })
    }
    render() {
        return (
            <div>
            <h5>Your email address is confirmed, please press the Home button and Log in</h5>
            <Button waves="light" node='a' href='/'>Home</Button>
            </div>
                )

    }
}

export default ConfirmEmail;
