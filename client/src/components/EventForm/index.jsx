import moment from 'moment';
import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import SelectCategory from './SelectCategory';
import TagAutocomplete from './TagAutocomplete';
import { request } from '../../utils';


class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      long: '',
      lat: '',
      description: '',
      category: '',
      start_date: '',
      start_time: '',
      end_time: '',
      end_date: '',
      error: {
        name: '',
        long: '',
        lat: '',
        description: '',
        category: '',
        start_date: '',
        start_time: '',
        end_time: '',
        end_date: '',
      },
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('user-log', (e) => this.props.history.push('/'), {once: true});
  }

  addEvent = (e) => {
    let isErrors = false;
    let errorMessages = {
      name: '',
      long: '',
      lat: '',
      description: '',
      category: '',
      start_date: '',
      start_time: '',
      end_time: '',
      end_date: '',
    };
    this.setState({error: errorMessages});

    for(const id in this.state.error) {
      if (id === 'end_date') {
        if (this.state.end_date && !this.state.end_time) {
          errorMessages.end_time = "Required, if end date set";
          isErrors = true;
        } else if (this.state.end_time && !this.state.end_date) {
          errorMessages.end_date = "Required, if end time set";
          isErrors = true;
        }
      } else if (id !== 'end_time' && !this.state[id]) {
        errorMessages[id] = "Required";
        isErrors = true;
      }
    }

    if (isErrors) {
      this.setState({error: {
        ...this.state.error,
        ...errorMessages,
      }});
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
        this.setState({
          error: {
            ...this.state.error,
            end_date: 'Invalid date and time',
          }
        });
        return 1;
      };
    };

    const tag_arr = window.$('#chips-tags').material_chip('data');
    if (tag_arr.length) {
      eventData.tags = tag_arr.map(obj => obj.tag);
    };

    request('/event', 'POST', JSON.stringify(eventData))
    .then(data => {
      if ('errors' in data) {
        for (let i = 0; i < data['errors'].length; i++) {
          window.Materialize.toast(`${data.errors[i].name}: ${data.errors[i].description}`, 5000);
          errorMessages[data.errors[i].name] = data.errors[i].description;
        };
        
        this.setState({error: {
          ...this.state.error,
          ...errorMessages,
        }});
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
              type="text"
              label="Event Name"
              error={this.state.error.name}
              value={this.state.name}
              onChange={this.onChangeHandler}
            />
          </Row>
          <Row>
            <Input
              s={6}
              id="long"
              type="text"
              step="0.000001"
              label="Longitude (must be a float)"
              error={this.state.error.long}
              value={this.state.long}
              onChange={this.onChangeHandlerFloat}
            />
            <Input
              s={6}
              id="lat"
              type="text"
              step="0.000001"
              label="Latitude (must be a float)"
              error={this.state.error.lat}
              value={this.state.lat}
              onChange={this.onChangeHandlerFloat}
            />
          </Row>
          <Row className="textarea-wrapper">
            <Input
              s={12}
              id="description"
              type="textarea"
              label="Description"
              error={this.state.error.description}
              value={this.state.description}
              onChange={this.onChangeHandler}
            />
          </Row>
          <Row>
            <Input
              s={6}
              id="start_date"
              error={this.state.error.start_date}
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
              error={this.state.error.start_time}
              onChange={this.onChangeHandler}
              label="Pick start time"
            />
          </Row>
          <Row>
            <Input
              s={6}
              id="end_date"
              error={this.state.error.end_date}
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
              error={this.state.error.end_time}
              onChange={this.onChangeHandler}
              label="Pick end time"
            />
          </Row>
          <Row className="category-select-wrapper">
            <SelectCategory error={this.state.error.category} onChangeHandler={this.onChangeHandler} />
          </Row>
          <Row>
            <TagAutocomplete />
          </Row>
          <Row className="center-align">
            <Button waves="light" onClick={this.addEvent}>Add Event</Button>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default EventForm;
