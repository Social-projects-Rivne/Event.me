import React, { Component } from 'react';
import { Row, Col } from 'react-materialize'


export default class Home extends Component {
  render() {
    return (
      <Row>
        <Col s={4}><h1>This is Home</h1></Col>
      </Row>
    );
  }
}
