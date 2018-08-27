import React, { Component } from 'react';
import { Row, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import { isLogged } from '../utils';
import HotEvents from './HotEvents'


class Home extends Component {
  componentDidMount() {
    window.addEventListener('user-log', (e) => this.forceUpdate());
  }

  renderAddEventButton() {
    if (isLogged()) {
      return (
        <div className="fixed-action-btn horizontal">
          <Link className="btn-floating btn-large red" to="/add-event">
            <Icon>add</Icon>
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
        </Row>
        <Row>
          <HotEvents />
        </Row>
        {this.renderAddEventButton()}
      </React.Fragment>
    );
  }
}

export default Home;
