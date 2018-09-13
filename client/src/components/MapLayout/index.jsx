import React, { Component } from 'react';
import { Row, Col, Button, Icon } from 'react-materialize'
import { Link } from 'react-router-dom';
import EventMap from '../EventMap';
import { request, isLogged } from '../../utils';
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

  filter = () => {
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

  componentDidMount = () => {
    document.title = "Event Map | Event.me"
    this.filter();
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
      <Row>
        <Col>
          <p>
            <input
              className="with-gap"
              name="group1"
              type="radio"
              id="radio_1"
              value='1'
              onChange={this.onChangeHandlerRadio} />
            <label htmlFor="radio_1">One day</label>
          </p>
          <p>
            <input
              className="with-gap"
              name="group1"
              type="radio"
              id="radio_2"
              value='7'
              onChange={this.onChangeHandlerRadio} />
            <label htmlFor="radio_2">One week</label>
          </p>
          <p>
            <input
              className="with-gap"
              name="group1"
              type="radio"
              id="radio_3"
              value='14'
              onChange={this.onChangeHandlerRadio} />
            <label htmlFor="radio_3">Two weeks</label>
          </p>
          <p>
            <input
              className="with-gap"
              name="group1"
              type="radio"
              id="radio_4"
              value='31'
              onChange={this.onChangeHandlerRadio} />
            <label htmlFor="radio_4">A month</label>
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
        {this.renderAddEventButton()}
      </Row>
    );
  }
}

export default MapLayout;
