import React, { Component } from 'react';
import {Col, Row} from "react-materialize";

class ChangePasswordConfirm extends Component{

    render() {
        return (
          <Row>
           <Col s={9} offset="s2" className="left-align">
              <h5>Password was successfully changed on new.</h5>
           </Col>
          </Row>

        )
    }
}

export default ChangePasswordConfirm;
