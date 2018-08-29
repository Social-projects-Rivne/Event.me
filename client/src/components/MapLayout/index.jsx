import React, { Component } from 'react';
import {Row, Col, Input, Button} from 'react-materialize'
import MapFilters from './MapFilters';
import EventMap from '../EventMap';
import { request } from '../../utils';
import SelectCategory from '../EventForm/SelectCategory';


class MapLayout extends Component {
  state = {
    events: [],
    day_filter: 0,
    category: ''
  }

  onChangeHandler = (e) => {
      let {id} = e.currentTarget
      this.setState({[id]: e.currentTarget.value})
  };
  filter = (e) => {
      let filterData = {
          day_filter: this.state.day_filter,
          category: this.state.category
      }
      request('/events-short-info', 'POST', JSON.stringify(filterData)).then(data => {
          if ('info' in data) {
              this.setState({ events: data.info })
          }
      });
  }

  componentDidMount() {
      let filterData = {
          day_filter: this.state.day_filter
      }
      request('/events-short-info', 'POST', JSON.stringify(filterData)).then(data => {
          if ('info' in data) {
              this.setState({ events: data.info })
          }
      });
  }

  render(){
    return (
      <Row>
          <Input id='day_filter' s={3} type='select' label="Filter by days" defaultValue='' onChange={this.onChangeHandler}>
              <option value="" disabled selected>Choose filter</option>
              <option value='1' >Today</option>
              <option value='7'>One week</option>
              <option value='14'>Two weeks</option>
          </Input>
          <Button onClick={this.filter}>Filter</Button>
          <Col s={3}>
              <SelectCategory onChangeHandler={this.onChangeHandler}/>
          </Col>
        <Col s={4}>
          <MapFilters />
        </Col>
        <Col s={8} className="map-page-container">
          <EventMap events={this.state.events}/>
        </Col>
      </Row>
    );
  }
}

export default MapLayout;
