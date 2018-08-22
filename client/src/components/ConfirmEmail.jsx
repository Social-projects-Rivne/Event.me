import React, { Component } from 'react';
import { request } from '../utils';
import {Button, Col} from "react-materialize";

class ConfirmEmail extends Component{
    state = {
        msg: '',
        message_to_user: ''
    }

    componentDidMount(){
        request('/email_confirm/'+this.props.match.params.token)
            .then(data=>{
                this.setState({msg: data.msg})
                if (
                    this.state.msg === "Your email address is confirmed"
                ){
                    this.setState({message_to_user:
                                  "Your email address is confirmed, please press the Home button and Log in"})
                    window.Materialize.toast(this.state.msg, 3000)

                } else {
                    this.setState({message_to_user: "Error404 HTTPNotFound"})
                    window.Materialize.toast(this.state.msg, 3000)
                }
            })
    }
    render() {
        return (
           <Col s={6} offset="s3">
              <h5 className="center-align">{this.state.message_to_user}</h5>
              <Col s={6} className="center-align">
                 <Button waves="light" node='a' href='/'>Home</Button>
              </Col>
            </Col>
        )
    }
}

export default ConfirmEmail;
