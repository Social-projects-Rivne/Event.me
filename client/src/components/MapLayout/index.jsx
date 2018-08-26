import React, { Component } from 'react';
import { Row, Col } from 'react-materialize'
import MapFilters from './MapFilters';
import EventMap from '../EventMap';
import { request } from '../../utils';


class MapLayout extends Component {
  state = {
    events: [],
  }

  componentDidMount() {
    request('/events-short-info').then(data => {
      if ('info' in data) {
        data.info.forEach(element => {
          let eventShortInfo = this.state.events;
          eventShortInfo.push(element);
          this.setState({ events: eventShortInfo });
        });
      }
    });
  }

  render(){
    return (
      <Row>
        <Col s={4}>
          <MapFilters />
        </Col>
        <Col s={8} className="map-page-container">
          <EventMap events={this.state.events} />
        </Col>
      </Row>
    );
  }
}

export default MapLayout;
