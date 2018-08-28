import React, { Component } from 'react';
import { Card, CardTitle, Col, Row } from 'react-materialize'
import { request } from '../utils'
import { Link } from 'react-router-dom'
import moment from 'moment';


class HotEvents extends Component {
  state = {
    hot_events: [],
    num_fo_hot_events: null,
    display_method: null
  }

  componentDidMount() {
    request('/hot-event/')
    .then(data => {
      this.setState({
        hot_events: data.hot_events,
        num_of_hot_events: data.num_of_hot_events
       })
       if (this.state.num_of_hot_events === 1) {
         this.setState({ display_method: 12})
       }
       else if (this.state.num_of_hot_events === 2) {
         this.setState({ display_method: 6 })
       }
       else {
         this.setState({ display_method: 4 })
       }
    })
  }

  renderHotEvents() {
      return (
        <React.Fragment>
          {this.state.hot_events.map((element) => (
            <Col key={element.id} s={this.state.display_method}>
              <Card
                className="custom-card-height medium"
                header={
                  <CardTitle image={element.main_image}>
                    {element.name}
                  </CardTitle>
                }
                actions={[
                  <Link to={"/event/" + element.id}>View Info</Link>
                ]}
                >
                  <span className="hot-event-description">
                    {element.description}
                  </span>
                  <Row className="hot-event-after-name">
                    <Col s={6}>
                      <p className="hot-event-other-info">Organizer: {element.author_name}</p>
                    </Col>
                    <Col className="right-align" s={6}>
                      <p className="hot-event-other-info">Start: {moment(element.start_date).format('LL')}</p>
                      <p className="hot-event-other-info">End: {moment(element.end_date).format('LL')}</p>
                    </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </React.Fragment>
      );
  }

  render(){
    return (
      <React.Fragment>
        {this.renderHotEvents()}
      </React.Fragment>
    );
  }
}

export default HotEvents;
