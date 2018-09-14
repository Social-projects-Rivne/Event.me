import React, { Component } from 'react';
import { Button, Col} from 'react-materialize';
import { request } from '../utils';


class AdminPageEvent extends Component {
  state = {
    new_events: [],
    event_id: 0,
    status_id: 0

  };

  componentDidMount() {
    request('/admin-page/events')
      .then(data => {
        this.setState({
          new_events: data.new_events
          });
    })
  }
  approveHandler = e => {
      const event_obj = {
        event_id: e.currentTarget.getAttribute('data-id')
      };
      request('/admin-page/events', "POST", JSON.stringify(event_obj)).then(data => {
        window.Materialize.toast(data.ok, 3000);

      })

  }

  // changeEventStatus = (e) => {
  //   let status_event = {
  //     status_id: this.status_id,
  //     event_id: this.event_id
  //   }
  //
  //   request('/admin-page/events', "POST", JSON.stringify(status_event))
  //       .then(data => {})
  // }

  renderNewEvent() {
    return (
      <React.Fragment>
        {this.state.new_events.map((element) => {
          return (
            <div>
              <Col>
                <Button node='a' href={`http://localhost:3000/#/event/${element.id}`}>Event id > {element.id}</Button>
                <Button data-id={element.id} onClick={this.approveHandler}>Approve</Button>
              </Col>
            </div>
          )
        }
    )}
      </React.Fragment>
    );
  }
  render() {
    return (
        <React.Fragment>
            New Events
            {this.renderNewEvent()}
        </React.Fragment>
    );
  }
}

export default AdminPageEvent;
