import moment from 'moment';
import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import SelectCategory from './SelectCategory';
import TagAutocomplete from './TagAutocomplete';
import { request } from '../utils';


class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      long: '',
      lat: '',
      description: '',
      category: '',
      tags: '',
      start_date: '',
      start_time: '',
      end_time: '',
      end_date: '',
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('user-log', (e) => this.props.history.push('/'), {once: true});
  }

  addEvent = (e) => {
    if (!this.state.name
     || !this.state.description
     || !this.state.long
     || !this.state.lat
     || !this.state.category
     || !this.state.start_date
     || !this.state.start_time) {
      window.Materialize.toast('Invalid input', 3000);
      return 1;
    };

    if (!this.state.end_date !== !this.state.end_time) {
      window.Materialize.toast('Invalid input', 3000);
      return 1;
    };

    let eventData = {
      name: this.state.name,
      lat: this.state.lat,
      long: this.state.long,
      description: this.state.description,
      category: this.state.category,
      start_date: moment(
        [this.state.start_date, this.state.start_time].join(' '),
        'D MMMM, YYYY h:mmA'
        )._d.toJSON(),
    };

    if (this.state.end_date && this.state.end_time) {
      eventData.end_date = moment(
        [this.state.end_date, this.state.end_time].join(' '),
        'D MMMM, YYYY h:mmA'
        )._d.toJSON();

      if (eventData.end_date < eventData.start_date){
        window.Materialize.toast('End date must be later than start', 3000);
        return 1;
      };
    };

    request('/event', 'POST', JSON.stringify(eventData))
    .then(data => {
      if ('errors' in data) {
        for (let i = 0; i < data['errors'].length; i++) {
          window.Materialize.toast(`${data.errors[i].name}: ${data.errors[i].description}`, 5000);
        };

        return 1;
      };

      this.props.history.push(`/event/${data.new_event_id}`);
    });
  }

  onChangeHandler = (e) => {
    const { id } = e.currentTarget;
    this.setState({ [id]: e.currentTarget.value });

    if (id === 'start_date') {
      document.getElementById('start_time').click();
    };

    if (id === 'end_date') {
      document.getElementById('end_time').click();
    };
  }

  onChangeHandlerFloat = (e) => {
    const { id } = e.currentTarget;
    this.setState({ [id]: e.target.value.replace(/[^0-9.-]/,'') });
  }

  render() {
    return (
      <Row>
        <Col s={6} offset="s3">
          <Row>
            <Input
              s={12}
              id="name"
              value={this.state.name}
              onChange={this.onChangeHandler}
              type="text"
              label="Event Name"
            />
          </Row>
          <Row>
            <Input
              s={6}
              id="long"
              value={this.state.long}
              onChange={this.onChangeHandlerFloat}
              type="text"
              step="0.000001"
              label="Longitude (must be a float)"
            />
            <Input
              s={6}
              id="lat"
              value={this.state.lat}
              onChange={this.onChangeHandlerFloat}
              type="text"
              step="0.000001"
              label="Latitude (must be a float)"
            />
          </Row>
          <Row>
            <Input
              s={12}
              id="description"
              value={this.state.description}
              onChange={this.onChangeHandler}
              type="textarea"
              label="Description"
            />
          </Row>
          <Row>
            <Input
              s={6}
              id="start_date"
              onChange={this.onChangeHandler}
              type="date"
              options={
                { 'min': new Date(), }
              }
              label="Pick start date"
            />
            <Input
              s={6}
              id="start_time"
              type="time"
              onChange={this.onChangeHandler}
              label="Pick start time"
            />
          </Row>
          <Row>
            <Input
              s={6}
              id="end_date"
              onChange={this.onChangeHandler}
              type="date"
              options={
                { 'min': new Date(), }
              }
              label="Pick end date"
            />
            <Input
              s={6}
              id="end_time"
              type="time"
              onChange={this.onChangeHandler}
              label="Pick end time"
            />
          </Row>
          <Row>
            <SelectCategory onChangeHandler={this.onChangeHandler} />
          </Row>
          <Row>
            <TagAutocomplete onChangeHandler={this.onChangeHandler}/>
          </Row>
          <Button waves="light" onClick={this.addEvent}>Add Event</Button>
        </Col>
      </Row>
    );
  }
}

export default AddEvent;
