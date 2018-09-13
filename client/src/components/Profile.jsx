import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardTitle } from 'react-materialize';
import { request } from '../utils';


class Profile extends Component {

    state = {
        user: {},
    };

    componentDidMount() {
        request('/profile/' + this.props.match.params.profile_id)
        .then(data => {
            this.setState({ user: data });
        })
        document.getElementById('root').style = "background-color: #3700B3; \
                                                  width: 100%; \
                                                  height: 25em;"
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
                <a
                  href={"/#/profile-edit/" + sessionStorage['User-id']}>
                    Edit
                </a>
            );
        }
    };

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
                  this.state.user.avatar ===
                  null ? "/default_profile.png" : this.state.user.avatar
                }
              >
              </CardTitle>
            }
            actions={
              [ <React.Fragment>{this.renderEditButton()}</React.Fragment> ]
            }
          >
            <h4 className="title-profile">Profile&nbsp;&nbsp;<span className="profile-title-nick">@{this.state.user.nickname}</span></h4>
            <hr className="profile-hr"/>
            <p className="profile-bio">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis mauris nec cursus ultrices. Sed quis tempor sapien. Vestibulum bibendum tincidunt pharetra. Cras efficitur ultrices lacus in dictum.
            </p>
            <p className="profile-bio-loc">
              Location: {this.state.user.location}
            </p>
          </Card>
        </div>
      );
   }
}

export default Profile;
