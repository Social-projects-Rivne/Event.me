import React, { Component } from 'react';
import { Row, Col } from 'react-materialize'
import MapFilters from './MapFilters';
import EventMap from './EventMap';


class MapLayout extends Component {

  render(){
    return (
      <Row>
        <Col s={4}>
          <MapFilters />
        </Col>
        <Col s={8}>
          <EventMap />
        </Col>
      </Row>
    );
  }
}

export default MapLayout;