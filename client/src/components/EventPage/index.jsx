import React, { Component } from 'react';
import { Parallax, Row, Col, CardPanel, Icon } from 'react-materialize';
import moment from 'moment';
import EventMap from '../EventMap';
import EventMeta from './EventMeta';
import { request } from '../../utils';


class EventPage extends Component {
  state = {
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    author_id: '',
    author_name: '',
    category_id: '',
    main_image: '',
    lat: '',
    long: '',
    category: '',
    tags: {},
  }

  componentDidMount = () => this.getEventData();

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getEventData();
    }
  }

  getEventData() {
    request(`/event/${this.props.match.params.id}`).then(data => {

      if ('event' in data) {
        for (const key in data.event) {
          if (this.state.hasOwnProperty(key)) {
            this.setState({ [key]: data.event[key] });
          }
        }

        this.setState({ category: data.category });
        this.setState({ tags: data.tags });
      }
    })
  }

  renderTimeString() {
    const start_day = moment(this.state.start_date).format('MMMM D, YYYY');
    if (!this.state.end_date) {
      return (
        <p className="flow-text">
          <Icon>date_range</Icon>
          {start_day}
          <Icon>access_time</Icon>
          {moment(this.state.start_date).format('hh:mm')}
        </p>
      )
    }

    if (start_day === moment(this.state.end_date).format('MMMM D, YYYY')) {
      return (
        <p className="flow-text">
          <Icon>date_range</Icon>
          {start_day}
          <Icon>access_time</Icon>
          {`${moment(this.state.start_date).format('hh:mm')} - ${moment(this.state.end_date).format('hh:mm')}`}
        </p>
      )
    }

    return (
      <p className="flow-text">
        <Icon>date_range</Icon>
        {
          [
            moment(this.state.start_date).format('MMMM D, YYYY hh:mm'),
            moment(this.state.end_date).format('MMMM D, YYYY hh:mm')
          ].join(' - ')
        }
      </p>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.state.main_image ? <Parallax imageSrc={this.state.main_image} /> : ''}
        <CardPanel className="black-text">
          <Row>
            <Col s={12} className="left-align">
              <h3>{this.state.name}</h3>
            </Col>
          </Row>
          <Row>
            <Col s={12} className="left-align valign-wrapper">
              <blockquote>{this.renderTimeString()}</blockquote>
            </Col>
          </Row>
          <Row>
            <Col>
              <EventMeta
                author_name={this.state.author_name}
                author_id={this.state.author_id}
                category={this.state.category}
                category_id={this.state.category_id}
                tags={this.state.tags}
              />
            </Col>
          </Row>
          <Row>
            <p className="event-description">{this.state.description}</p>
          </Row>
          <Row className="map-single-container">
            <EventMap events={
              [
                {
                  id: this.props.match.params.id,
                  long: this.state.long,
                  lat: this.state.lat,
                  name: this.state.name,
                }
              ]
            } />
          </Row>
        </CardPanel>
      </React.Fragment>
    );
  }
}

export default EventPage;
