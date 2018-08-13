import React, { Component } from 'react';
import {Row, Col} from 'react-materialize'
import {server_url} from '../config.json'


export default class Home extends Component {
  componentDidMount() {
    fetch(server_url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log('Data: ', data)
      })
  }

  render() {
    return (
      <Row>
        <Col s={1}></Col>
        <Col s={4}><h1>This is Home</h1></Col>
      </Row>
    );
  }
}
