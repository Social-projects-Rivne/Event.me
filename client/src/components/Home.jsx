import React, { Component } from 'react';
import { Row, Col, Icon } from 'react-materialize'
import { Link } from 'react-router-dom'
import { isLogged } from '../utils'

class Home extends Component {
  componentDidMount() {
    window.addEventListener('user-log', (e) => this.forceUpdate());
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col s={6} offset="s2"><h1>This is Home</h1></Col>
        </Row>
        {
          isLogged() ?
            <div className="fixed-action-btn horizontal">
              <Link className="btn-floating btn-large red" to="/add-event">
                <Icon>add</Icon>
              </Link>
            </div>
            : null
        }
      </React.Fragment>
    );
  }
}

export default Home;
