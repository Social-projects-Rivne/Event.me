import React, { Component } from 'react';
import { Table, Input, Button, Col} from 'react-materialize';
import { request, momentUTCToLocal } from '../utils';


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

  changeEventStatus = (e) => {
    let {id} = e.currentTarget;

  }

  renderNewEvent() {
        return (
             <React.Fragment>
                {this.state.new_events.map((element) => {
                return (
                <div>
                    <Col>
                <Button node='a' href={`http://localhost:3000/#/event/${element.id}`}>Event id > {element.id}</Button>
                <Button>Approve</Button>
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
