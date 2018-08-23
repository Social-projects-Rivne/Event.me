import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import { request } from '../utils';


class Profile extends Component {

    state = {
        user: {},
    };

    componentDidMount() {
        request('/profile/' + this.props.match.params.profile_id)
        .then(data => {
            this.setState({ user: data });
            sessionStorage.setItem("User-nickname", this.state.user.nickname);
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.profile_id !==
            prevProps.match.params.profile_id) {
            request('/profile/' + this.props.match.params.profile_id)
            .then(data => {
                this.setState({ user: data });
                sessionStorage.setItem("User-nickname", this.state.user.nickname);
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
                <Link
                  className="waves-effect waves-light btn"
                  to={"/profile-edit/" + sessionStorage['User-id']}>
                    Edit
                </Link>
            );
        }
    };

    render() {
      return (
        <div>
          <div>
            <h1>Profile</h1>
          </div>
          <div id="main">
            <Row>
              <Col s={6}>
                <Row>
                  {this.renderAvatarImage()}
                </Row>
              </Col>
              <Col s={3}>
                <Row s={2}><h4>Nickname:</h4></Row>
                <Row s={2}><h4>First Name: </h4></Row>
                <Row s={2}><h4>Last Name: </h4></Row>
                <Row s={2}><h4>Location: </h4></Row>
              </Col>
              <Col s={3}>
                <Row s={2}><h4>{this.state.user.nickname}</h4></Row>
                <Row s={2}><h4>{this.state.user.first_name}</h4></Row>
                <Row s={2}><h4>{this.state.user.last_name}</h4></Row>
                <Row s={2}><h4>{this.state.user.location}</h4></Row>
                <Row s={2}>
                  {this.renderEditButton()}
                </Row>
              </Col>
            </Row>
            <br />
          </div>
        </div>
      );
   }
}

export default Profile;
