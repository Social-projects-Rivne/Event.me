import React, { Component } from 'react';

let headers = new Headers()

const myInit = {method: 'GET',
                mode: 'cors',
                headers: headers,
                cache: 'default' }

export class Home extends Component {
  componentDidMount() {
    fetch('http://localhost:6543', myInit)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log('Data: ', data)
      })
  }

  render() {
    return (
        <h1>This is Home</h1>
    );
  }
}
