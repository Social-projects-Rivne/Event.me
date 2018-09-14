import moment from 'moment';
import React, { Component } from 'react';
import { Row, Col, Input, Button, Modal } from 'react-materialize';
import SelectCategory from './SelectCategory';
import TagAutocomplete from './TagAutocomplete';
import DraggableMarker from './DraggableMarker';
import { request, momentUTCToLocal } from '../../utils';


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
        description: '',
        category: '',
        start_date: '',
        start_time: '',
        end_time: '',
        end_date: '',
      },
      status: '',
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.coordinatesHandle = this.coordinatesHandle.bind(this);
  }

  deleteTag (tag) {
    delete this.state.tags[tag];
  }

  validateData() {
    let isErrors = false;
    let errorMessages = {
      title: '',
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

  createEventDataObj() {
    let eventData = {
      name: this.state.title,
      lat: this.state.lat,
      long: this.state.long,
      description: this.state.description,
      category: this.state.category,
      start_date: moment(
        [this.state.start_date, this.state.start_time].join(' '),
        'D MMMM, YYYY HH:mm'
      )._d.toJSON(),
    };

    if (this.state.end_date && this.state.end_time) {
      eventData.end_date = moment(
        [this.state.end_date, this.state.end_time].join(' '),
        'D MMMM, YYYY HH:mm'
      )._d.toJSON();

      if (eventData.end_date < eventData.start_date) {
        this.setState({
          error: {
            ...this.state.error,
            end_date: 'End date can\'t be later than start',
          }
        });
        return 1;
      };
    };

    const tag_arr = window.$('#chips-tags').material_chip('data');
    if (tag_arr.length) {
      eventData.tags = tag_arr.map(obj => obj.tag);
    };
    return eventData;
  }

  componentDidMount() {
    if ('id' in this.props.match.params) {
      request(`/event/${this.props.match.params.id}`).then(data => {
        if ('event' in data) {
          data.event.title = data.event.name
          for (const key in data.event) {
            if (key in this.state && key !== 'lat' && key !== 'long') {
              if (key === 'start_date' || key === 'end_date') {
                this.setState({ [key]: momentUTCToLocal(data.event[key]).format('D MMMM, YYYY') });

                if (key === 'start_date') {
                  this.setState({ start_time: momentUTCToLocal(data.event[key]).format('HH:mm') });
                  document.getElementById('start_time').value =
                    momentUTCToLocal(data.event[key]).format('HH:mm');
                  document.getElementById('start_time')
                    .parentNode.lastChild.className = 'active';
                } else {
                  this.setState({ 'end_time': momentUTCToLocal(data.event[key]).format('HH:mm') });
                  document.getElementById('end_time').value =
                    momentUTCToLocal(data.event[key]).format('HH:mm');
                  document.getElementById('end_time')
                    .parentNode.lastChild.className = 'active';
                }
              } else {
                this.setState({ [key]: String(data.event[key]) });
              }
              document.getElementById([key]).parentNode.lastChild.className = 'active';
            }
          }
          this.setState({
            'lat': data.event.lat,
            'long': data.event.long,
            'category': data.category,
            'tags': data.tags,
            'status_str': data.status_str,
          });
        }
      })
    }
    window.addEventListener('user-log', (e) => this.props.history.push('/'), { once: true });
  }

  updateEvent = (e) => {
    let errorMessages = this.validateData();
    if (!errorMessages) return 0;

    request(
      `/event/${this.props.match.params.id}`,
      'PUT',
      JSON.stringify(this.createEventDataObj()))
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

    request('/event', 'POST', JSON.stringify(this.createEventDataObj()))
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

  closeEventHandler = (e) => {
    request(`/event/${this.props.match.params.id}`, 'DELETE').then(data => {
      if ('success' in data && data.success) {
        this.props.history.push(`/event/${this.props.match.params.id}`);
        window.Materialize.toast('Your event successfully closed', 3000);
      }
    })
  }

  coordinatesHandle(lat, long) {
    this.setState({
      lat: lat,
      long: long
    })
  }

  renderButtons() {
    if ('id' in this.props.match.params) {
      if(this.state.status_str === 'Close') return (
        <React.Fragment>
          <Col className="center-align" s={12}>
            <Button waves="light" onClick={this.updateEvent}>Update Event</Button>
          </Col>
        </React.Fragment>
      )
      else return (
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
            header='Close Event'
            actions={
              <div>
                <Button flat modal="close" waves="light" onClick={this.closeEventHandler}>
                  Confirm
                </Button>
                <Button flat modal="close" waves="light">
                  Cancel
                </Button>
              </div>
            }>
            Do you really want to close this event?
          </Modal>
        </React.Fragment>
      )
    } else return (
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
            <h4>Drag and drop marker for choose event coordinates</h4>
            <DraggableMarker lat={this.state.lat} long={this.state.long} coordinatesHandle={this.coordinatesHandle}/>
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
              options={
                {
                  twelvehour: false,
                  autoclose: false,
                }
              }
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
              options={
                {
                  twelvehour: false,
                  autoclose: false,
                }
              }
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
            <TagAutocomplete deleteTag={this.deleteTag} value={this.state.tags} />
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
