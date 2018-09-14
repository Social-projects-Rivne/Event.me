import React, { Component } from 'react';
import { request } from '../utils';
import {Button, Col, Row} from "react-materialize";

class ConfirmEmail extends Component{
    state = {
        msg: '',
        message_to_user: ''
    }

    componentDidMount(){
        request('/email_confirm/'+this.props.match.params.token)
            .then(data=>{
                this.setState({msg: data.msg})
                if (this.state.msg === "Your email address is confirmed") {
                    this.setState({
                        message_to_user: "Your email address is confirmed, please press the Home button and Log in"
                    });
                    window.Materialize.toast(this.state.msg, 3000);

                } else {
                    this.setState({message_to_user: "Error 404 Not Found"});
                    window.Materialize.toast(this.state.msg, 3000);
                }
                document.title = "Email Confirmation | Event.me"
            })
    }
    render() {
        return (
          <Row>
           <Col s={6} offset="s3" className="center-align">
              <h5>{this.state.message_to_user}</h5>
           </Col>
           <Col s={6} offset="s3" className="center-align">
               <Button waves="light" node='a' href='/'>Home</Button>
           </Col>
          </Row>

        )
    }
}

export default ConfirmEmail;
