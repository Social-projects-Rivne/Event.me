import React, { Component } from 'react';
import { Row, Col, Button} from 'react-materialize'
import EventMap from '../EventMap';
import { request } from '../../utils';
import SelectCategory from '../EventForm/SelectCategory';


class MapLayout extends Component {
  state = {
    events: [],
    date_filter: '0',
    category: ''
  }

  onChangeHandlerRadio = (e) => {
    this.setState({ date_filter: e.currentTarget.value })
  };

  onChangeHandler = (e) => {
    let { id } = e.currentTarget
    this.setState({ [id]: e.currentTarget.value })
  };

  filter = (e) => {
    let filterData = {
      day_filter: this.state.date_filter,
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
      day_filter: this.state.date_filter,
      category: this.state.category
    }
    request('/events-short-info', 'POST', JSON.stringify(filterData)).then(data => {
      if ('info' in data) {
        this.setState({ events: data.info })
      }
    });
  }

  render() {
    return (
      <Row>
        <Col>
          <p>
              <input
                  className="with-gap"
                  name="group1"
                  type="radio"
                  id="test1"
                  value='1'
                  onChange={this.onChangeHandlerRadio}/>
              <label htmlFor="test1">One day</label>
          </p>
          <p>
              <input
                  className="with-gap"
                  name="group1"
                  type="radio"
                  id="test2"
                  value='7'
                  onChange={this.onChangeHandlerRadio}/>
              <label htmlFor="test2">One week</label>
          </p>
          <p>
              <input
                  className="with-gap"
                  name="group1"
                  type="radio"
                  id="test3"
                  value='14'
                  onChange={this.onChangeHandlerRadio}/>
              <label htmlFor="test3">Two weeks</label>
          </p>
          <p>
              <input
                  className="with-gap"
                  name="group1"
                  type="radio"
                  id="test4"
                  value='31'
                  onChange={this.onChangeHandlerRadio}/>
              <label htmlFor="test4">A month</label>
          </p>
            <Button onClick={this.filter}>Filter</Button>
        </Col>
        <Col l={0}>
          <SelectCategory value={this.state.category} onChangeHandler={this.onChangeHandler} />
        </Col>
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

