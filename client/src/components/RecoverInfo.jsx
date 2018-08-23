import React, { Component } from 'react';
import {Col, Row} from "react-materialize";

class RecoverInfo extends Component{

    render() {
        return (
          <Row>
           <Col s={9} offset="s2" className="left-align">
              <h5>We have send you a password reset email.
              Sometimes this email can take a few minutes to reach in your inbox.
              It also can get redirected to your spam folder.</h5>
           </Col>
          </Row>

        )
    }
}

export default RecoverInfo;
