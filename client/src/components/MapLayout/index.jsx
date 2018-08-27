import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import EventMap from '../EventMap';
import { request } from '../../utils';


class MapLayout extends Component {
  state = {
    events: [],
  }

  componentDidMount() {
    request('/events-short-info').then(data => {
      if ('info' in data) {
        this.setState({ events: data.info });
      };
    });
  }

  render(){
    return (
      <Row>
        <Col s={4}>
          <div>
            &nbsp;
          </div>
        </Col>
        <Col s={8} className="map-page-container">
          <EventMap events={this.state.events} />
        </Col>
      </Row>
    );
  }
}

export default MapLayout;
