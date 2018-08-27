import moment from 'moment';
import React, { Component } from 'react';
import { Row, Col, Input, Button, Modal } from 'react-materialize';
import SelectCategory from './SelectCategory';
import TagAutocomplete from './TagAutocomplete';
import { request } from '../../utils';


class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      long: '',
      lat: '',
      description: '',
      category: '',
      start_date: '',
      start_time: '',
      end_time: '',
      end_date: '',
      error: {
        title: '',
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

  validateData() {
    let isErrors = false;
    let errorMessages = {
      title: '',
      long: '',
      lat: '',
      description: '',
      category: '',
      start_date: '',
      start_time: '',
      end_time: '',
      end_date: '',
    };
    this.setState({ error: errorMessages });

    for (const id in this.state.error) {
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
      this.setState({
        error: {
          ...this.state.error,
          ...errorMessages,
        }
      });
      window.Materialize.toast('Invalid input', 3000);
      return false;
    };
    return errorMessages;
  }

  componentDidMount() {
    if ('id' in this.props.match.params) {
      request(`/event/${this.props.match.params.id}`).then(data => {
        if ('event' in data) {
          data.event.title = data.event.name
          for (const key in data.event) {
            if (key in this.state) {
              if (key === 'start_date' || key === 'end_date') {
                this.setState({ [key]: moment(data.event[key]).format('D MMMM, YYYY') });

                if (key === 'start_date') {
                  this.setState({ start_time: moment(data.event[key]).format('h:mmA') });
                  document.getElementById('start_time').value =
                    moment(data.event[key]).format('h:mmA');
                  document.getElementById('start_time')
                    .parentNode.lastChild.className = 'active';
                } else {
                  this.setState({ 'end_time': moment(data.event[key]).format('h:mmA') });
                  document.getElementById('end_time').value =
                    moment(data.event[key]).format('h:mmA');
                  document.getElementById('end_time')
                    .parentNode.lastChild.className = 'active';
                }
              } else {
                this.setState({ [key]: String(data.event[key]) });
              }
              document.getElementById([key]).parentNode.lastChild.className = 'active';
            }
          }
          this.setState({ 'category': data.category });
          this.setState({ 'tags': data.tags });
        }
      })
    }
    window.addEventListener('user-log', (e) => this.props.history.push('/'), { once: true });
  }

  updateEvent = (e) => {
    if (!this.validateData()) return 0;

    let errorMessages = this.validateData();
    if (!errorMessages) return 0;

    let eventData = {
      name: this.state.title,
      lat: this.state.lat,
      long: this.state.long,
      description: this.state.description,
      category: this.state.category,
      start_date: moment(
        [this.state.start_date, this.state.start_time].join(' '),
        'D MMMM, YYYY h:mmA'
      ).add(3, 'hours')._d.toJSON(),
    };

    if (this.state.end_date && this.state.end_time) {
      eventData.end_date = moment(
        [this.state.end_date, this.state.end_time].join(' '),
        'D MMMM, YYYY h:mmA'
      ).add(3, 'hours')._d.toJSON();

      if (eventData.end_date < eventData.start_date) {
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

    request(`/event/${this.props.match.params.id}`, 'PUT', JSON.stringify(eventData))
      .then(data => {
        if ('errors' in data) {
          for (let i = 0; i < data['errors'].length; i++) {
            window.Materialize.toast(`${data.errors[i].name}: ${data.errors[i].description}`, 5000);
            errorMessages[data.errors[i].name] = data.errors[i].description;
          };

          this.setState({
            error: {
              ...this.state.error,
              ...errorMessages,
            }
          });
          return 1;
        };

        this.props.history.push(`/event/${this.props.match.params.id}`);
      });
  }

  addEvent = (e) => {
    let errorMessages = this.validateData();
    if (!errorMessages) return 0;

    let eventData = {
      name: this.state.title,
      lat: this.state.lat,
      long: this.state.long,
      description: this.state.description,
      category: this.state.category,
      start_date: moment(
        [this.state.start_date, this.state.start_time].join(' '),
        'D MMMM, YYYY h:mmA'
      ).add(3, 'hours')._d.toJSON(),
    };

    if (this.state.end_date && this.state.end_time) {
      eventData.end_date = moment(
        [this.state.end_date, this.state.end_time].join(' '),
        'D MMMM, YYYY h:mmA'
      ).add(3, 'hours')._d.toJSON();

      if (eventData.end_date < eventData.start_date) {
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

          this.setState({
            error: {
              ...this.state.error,
              ...errorMessages,
            }
          });
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
    this.setState({ [id]: e.target.value.replace(/[^0-9.-]/, '') });
  }

  closeEventHandler = (e) => {
    request(`/event/${this.props.match.params.id}`, 'DELETE').then(data => {
      if ('success' in data && data.success) {
        this.props.history.push(`/event/${this.props.match.params.id}`);
        window.Materialize.toast('Your event successfully closed', 3000);
      }
    })
  }

  renderButtons() {
    if ('id' in this.props.match.params) return (
      <React.Fragment>
        <Col className="left-align" s={6}>
          <Button waves="light" onClick={this.updateEvent}>Update Event</Button>
        </Col>
        <Col className="right-align" s={6}>
          <Button
            className="red" waves="light" onClick={() => window.$('#eventClose').modal('open')}>
            Close Event
          </Button>
        </Col>
        <Modal
          id='eventClose'
          header='Modal Header'
          actions={
            <div>
              <Button flat modal="close" waves="light" onClick={this.closeEventHandler}>
                Yes
              </Button>
              <Button flat modal="close" waves="light">
                No
              </Button>
            </div>
          }>
          Do you really want to close this event?
        </Modal>
      </React.Fragment>
    )
    else return (
      <Col className="center-align">
        <Button waves="light" onClick={this.addEvent}>Add Event</Button>
      </Col>
    )
  }

  render() {
    return (
      <Row>
        <Col s={8} offset="s2">
          <Row>
            <Col>
              <h2>Edit Event Data</h2>
            </Col>
          </Row>
          <Row>
            <Input
              s={12} id="title" type="text"
              label="Event Title"
              className="active"
              error={this.state.error.title}
              value={this.state.title}
              onChange={this.onChangeHandler}
            />
          </Row>
          <Row>
            <Input
              s={6} id="long" type="text"
              step="0.000001"
              label="Longitude (must be a float)"
              error={this.state.error.long}
              value={this.state.long}
              onChange={this.onChangeHandlerFloat}
            />
            <Input
              s={6} id="lat" type="text"
              step="0.000001"
              label="Latitude (must be a float)"
              error={this.state.error.lat}
              value={this.state.lat}
              onChange={this.onChangeHandlerFloat}
            />
          </Row>
          <Row className="textarea-wrapper">
            <Input
              s={12} id="description" type="textarea"
              label="Description"
              error={this.state.error.description}
              value={this.state.description}
              onChange={this.onChangeHandler}
            />
          </Row>
          <Row>
            <Input
              s={6} id="start_date" type="date"
              error={this.state.error.start_date}
              onChange={this.onChangeHandler}
              value={this.state.start_date}
              options={
                { 'min': new Date(), }
              }
              label="Pick start date"
            />
            <Input
              s={6} id="start_time" type="time"
              error={this.state.error.start_time}
              onChange={this.onChangeHandler}
              value={this.state.start_time}
              label="Pick start time"
            />
          </Row>
          <Row>
            <Input
              s={6} id="end_date" type="date"
              error={this.state.error.end_date}
              onChange={this.onChangeHandler}
              value={this.state.end_date}
              options={
                { 'min': new Date(), }
              }
              label="Pick end date"
            />
            <Input
              s={6} id="end_time" type="time"
              error={this.state.error.end_time}
              onChange={this.onChangeHandler}
              value={this.state.end_time}
              label="Pick end time"
            />
          </Row>
          <Row className="category-select-wrapper">
            <SelectCategory
              value={this.state.category}
              error={this.state.error.category}
              onChangeHandler={this.onChangeHandler}
            />
          </Row>
          <Row>
            <TagAutocomplete value={this.state.tags} />
          </Row>
          <Row>
            {this.renderButtons()}
          </Row>
        </Col>
      </Row>
    );
  }
}

export default EventForm;
