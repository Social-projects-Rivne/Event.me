import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardTitle } from 'react-materialize';
import { request } from '../utils';


class Profile extends Component {

    state = {
        user: {},
        history: [],
        any_history: false,
        events: [],
        display_method: null,
        card_size: null
    };

    componentDidMount() {
        request('/profile/' + this.props.match.params.profile_id)
        .then(data => {
            this.setState(
                { user: data },
                () => document.title = this.state.user.nickname + " | Event.me"
            );
        })
        request('/profile-history/' + this.props.match.params.profile_id)
        .then(data => {
          this.setState({
            history: data.history,
            events: data.events,
            any_history: true
          })
          if (data.num_of_events === 1) {
            this.setState({
              display_method: 12,
              card_size: 'large'
           })
          }
          else {
            this.setState({
              display_method: 6,
              card_size: 'medium'
            })
          }
        })
        const style = "background-color: #3700B3; width: 100%; height: 25em;"
        document.getElementById('root').style = style
    }

    componentWillUnmount() {
      document.getElementById('root').style = ""
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.profile_id !==
            prevProps.match.params.profile_id) {
            request('/profile/' + this.props.match.params.profile_id)
            .then(data => {
                this.setState({ user: data });
            })
        }
    }

    renderAvatarImage = () => {
        if (this.state.user.avatar === null) {
            return (
                <img
                  src="/default_profile.png"
                  alt="Default icon"
                />
            );
        }
        else {
            return (
                <img
                  src={this.state.user.avatar}
                  alt="Avatar icon"
                />
            );
        }
    };

    renderEditButton = () => {
        if (this.props.match.params.profile_id === sessionStorage['User-id']) {
            return (
              <Link to={"/profile-edit/" + sessionStorage['User-id']}>
                Edit Profile
              </Link>
            );
        }
    };

    renderProfileHistory = () => {
      return (
        <React.Fragment>
        {this.state.events.map((element) => {
          return (
            <Col key={element.id}>
              <Card
                horizontal
                header={
                  <CardTitle image={ element.main_image }></CardTitle>
                }
                actions={
                  [
                    <a
                      href={"/#/event/" + element.id}>
                        View Event
                    </a>
                  ]
                }
              >
                <h4 className="title-profile">Event&nbsp;&nbsp;<span className="profile-title-nick">@{element.name}</span></h4>
                <hr className="profile-hr"/>
                <p className="profile-bio">
                  {element.description}
                </p>
                <p className="profile-bio-loc">
                  Start Date: {element.start_date}
                </p>
                <p className="profile-bio-loc">
                  End Date: {element.end_date}
                </p>
              </Card>
            </Col>
          );
        })}
        </React.Fragment>
      );
    }

    render() {
      return (
        <div>
          <div className="profile-title-box">
            <span className="profile-title">
              {this.state.user.first_name}&nbsp;{this.state.user.last_name}
            </span>
          </div>
          <Card
            className="profile-card"
            horizontal
            header={
              <CardTitle
                image={
                  this.state.user.avatar === null ?
                  "/default_profile.png" : this.state.user.avatar
                }
              >
              </CardTitle>
            }
            actions={
              [ <React.Fragment>{this.renderEditButton()}</React.Fragment> ]
            }
          >
            <h4 className="title-profile">
              Profile&nbsp;&nbsp;
              <span className="profile-title-nick">
                @{this.state.user.nickname}
              </span>
            </h4>
            <hr className="profile-hr"/>
            <p className="profile-bio-loc">
              Location: {this.state.user.location}
            </p>
          </Card>
          <div className='profile-history-title-box'>
            <span className="profile-history-title">
              User History
            </span>
          </div>
          <Row>
            {this.renderProfileHistory()}
          </Row>
        </div>
      );
   }
}

export default Profile;
