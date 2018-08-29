import React, { Component } from 'react';
import { Parallax, Row, Col, CardPanel, Icon, Chip } from 'react-materialize';
import { Link } from 'react-router-dom';
import EventMap from '../EventMap';
import EventMeta from './EventMeta';
import { isEmpty, request, momentUTCToLocal } from '../../utils';


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

  componentDidMount = () => {
    window.addEventListener('user-log', (e) => {
      this.forceUpdate();
      this.setState({ status: undefined });
    });
    this.getEventData();
  }

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
          };
        };

        if ('status' in data) {
          this.setState({ status: data.status });
        }

        this.setState({
          category: data.category,
          tags: data.tags,
          status_str: data.status_str,
        });
      };
    });
  }

  renderEditButton() {
    if (parseInt(sessionStorage.getItem('User-id'), 10) === this.state.author_id) {
      return (
        <div className="fixed-action-btn horizontal">
          <Link
            className="btn-floating btn-large red"
            to={`/event/edit/${this.props.match.params.id}`}
          >
            <i className="large material-icons">mode_edit</i>
          </Link>
          <p className="btn-floating mobile-fab-tip">Edit Event</p>
        </div>
      )
    };
  }

  renderStatusContent() {
    if (this.state.status) {
      let bgColor = 'red';
      if(this.state.status_str === 'New') bgColor = 'amber';
      if (this.state.status_str === 'Approved' || this.state.status_str === 'Hot') bgColor = 'green';
      return (
      <div className={`${bgColor} flow-text white-text card-panel darken-1`}>
        {momentUTCToLocal(this.state.status.date).format('MMMM D, YYYY HH:mm')}
        <br />
        {this.state.status.comment}
      </div>
      )
    };
  }

  renderClosed() {
    if (!this.state.status && this.state.status_str === 'Close') return (
      <div className="center-align">
        <p className="flow-text red-text">This event closed</p>
      </div>
    )
  }

  renderTimeString() {
    const start_day = momentUTCToLocal(this.state.start_date).format('MMMM D, YYYY');
    if (!this.state.end_date) {
      return (
        <p className="flow-text">
          <Icon>date_range</Icon>
          {start_day}
          <Icon>access_time</Icon>
          {momentUTCToLocal(this.state.start_date).format('HH:mm')}
        </p>
      )
    }

    if (start_day === momentUTCToLocal(this.state.end_date).format('MMMM D, YYYY')) {
      return (
        <p className="flow-text">
          <Icon>date_range</Icon>
          {start_day}
          <Icon>access_time</Icon>
          {`${momentUTCToLocal(this.state.start_date).format('HH:mm')} -
            ${momentUTCToLocal(this.state.end_date).format('HH:mm')}`}
        </p>
      )
    }

    return (
      <p className="flow-text">
        <Icon>date_range</Icon>
        {
          [
            momentUTCToLocal(this.state.start_date).format('MMMM D, YYYY HH:mm'),
            momentUTCToLocal(this.state.end_date).format('MMMM D, YYYY HH:mm')
          ].join(' - ')
        }
      </p>
    )
  }

  renderTags() {
    if (!isEmpty(this.state.tags)) {
      let tags_arr = [];
      for (const key in this.state.tags) {
        if (this.state.tags.hasOwnProperty(key)) tags_arr[this.state.tags[key]] = key;
      }

      return (
        <Col className="valign-wrapper">
          <Icon>local_offer</Icon>
          &nbsp;
          {tags_arr.map((element, id) => {
            return <Chip key={id}><Link to={`/tag/${element}`}>{element}&nbsp;</Link></Chip>
          })
          }
        </Col>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderClosed()}
        {this.renderStatusContent()}
        {this.state.main_image ? <Parallax imageSrc={this.state.main_image} /> : ''}
        <CardPanel className="black-text">
          <Row>
            <Col s={12} className="left-align">
              <h3>{this.state.name}</h3>
            </Col>
          </Row>
          <Row>
            <Col s={12} className="left-align valign-wrapper">
              <blockquote>
                {this.renderTimeString()}
                <p className="flow-text"><Icon>location_on</Icon>Where: Some Cool Place</p>
                <EventMeta
                  author_name={this.state.author_name}
                  author_id={this.state.author_id}
                  category={this.state.category}
                  category_id={this.state.category_id}
                />
              </blockquote>
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
          <Row>
            {this.renderTags()}
          </Row>
        </CardPanel>
        {this.renderEditButton()}
      </React.Fragment>
    );
  }
}

export default EventPage;
