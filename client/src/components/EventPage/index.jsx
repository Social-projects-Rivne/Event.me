import React, { Component } from 'react';
import moment from 'moment';
import { Parallax, Row, Col } from 'react-materialize';
import EventMap from '../EventMap';
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
  }

  componentDidMount() {
    request(`/event/${this.props.match.params.id}`).then(data => {
      if ('event' in data) {
        for (const key in data.event) {
          if (this.state.hasOwnProperty(key)) {
            this.setState({ [key]: data.event[key] });
          }
        }
        this.setState({ category: data.category });
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      request(`/event/${this.props.match.params.id}`).then(data => {
        if ('event' in data) {
          for (const key in data.event) {
            if (this.state.hasOwnProperty(key)) {
              this.setState({ [key]: data.event[key] });
            }
          }
          this.setState({ category: data.category });
        }
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.main_image ? <Parallax imageSrc={this.state.main_image} /> : ''}
        <Row className="center-align">
          <h2>{this.state.name}</h2>
        </Row>
        <div className="container">
          <Row>
            <Col className="left-align" s={6}>
              <h6>
                Author: {this.state.author_name}
                <br />
                Category: {this.state.category}
              </h6>
            </Col>
            <Col className="right-align" s={6}>
              <h6>
                Start: {moment(this.state.start_date).format('D MMMM, YYYY h:mmA')}
                <br />
                {this.state.end_date ?
                  "End: " + moment(this.state.end_date).format('D MMMM, YYYY h:mmA')
                  : ''}
              </h6>
            </Col>
          </Row>
          <Row>
            <p className="flow-text">{this.state.description}</p>
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
        </div>
      </React.Fragment>
    );
  }
}

export default EventPage;
