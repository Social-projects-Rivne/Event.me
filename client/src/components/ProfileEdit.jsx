import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize'
import { request } from '../utils'
import { Link } from 'react-router-dom'


class ProfileEdit extends Component {

    state = {
        user: {},
        errors_edit: {}
    }

    componentDidMount() {
        request('/profile/' + this.props.match.params.profile_id)
        .then(json => {
            this.setState(
                { user: json },
                () => document.title = "Edit | " + this.state.user.nickname + " | Event.me"
            );
            this.setState({
                user: {
                    first_name_input: this.state.user.first_name,
                    last_name_input: this.state.user.last_name,
                    nickname_input: this.state.user.nickname,
                    location_input: this.state.user.location,
                }
            });
        })
    }

    UpdateClick = (eve) => {
        eve.preventDefault()

        this.setState({ errors_edit: {} })

        if (this.state.new_password_input ===
            this.state.repeat_password_input) {
            if (this.state.nickname_input === "") {
                this.setState({
                    errors_edit: {
                        ...this.state.errors_edit,
                        nickname: "You can't save empty nickname"
                    }
                });
            }
            else {
                const data = {
                    "first_name": this.state.first_name_input,
                    "last_name": this.state.last_name_input,
                    "nickname": this.state.nickname_input,
                    "location": this.state.location_input,
                    "password": this.state.new_password_input,
                    "id": this.state.user.id
                }
                request('/profile/' + this.props.match.params.profile_id,
                        "PUT", JSON.stringify(data))
                .then(data => {
                    if(data.success) {
                        if (this.state.nickname_input !== undefined) {
                            sessionStorage.setItem("User-nickname",
                                                    this.state.nickname_input);
                        }
                        this.setState({ errors_edit: {} });
                        this.props.history.push('/profile/' + this.props.match.params.profile_id);
                        window.Materialize.toast("Profile Updated", 2500);
                    }
                    else {
                        if ('errors' in data) {
                            let errors = data['errors'].reduce(
                                (accumulator, item) =>
                                { accumulator[item.name] =
                                  item.description;
                                  return accumulator; }, {});
                            this.setState({ errors_edit: errors });
                        }
                        else {
                            this.setState({ errors_edit: {} });
                            this.props.history.push('/profile/' + this.props.match.params.profile_id);
                            window.Materialize.toast("Profile Unchanged", 2500);
                        }
                    }
                })
            }
        }
        else {
            this.setState({
                errors_edit: {
                    ...this.state.errors_edit,
                    password: 'Incorrect repeated password'
                }
            });
        }
    };

    onChangeHandler = (e) => {
        let { id } = e.currentTarget
        this.setState({ [id]: e.currentTarget.value })
    }

    render() {
      return (
        <div>
          <div>
             <h1>Profile</h1>
          </div>
          <Row>
            <Input
              s={6}
              error={this.state.errors_edit.first_name}
              id="first_name_input"
              label="First Name"
              validate
              required
              value={this.state.user.first_name}
              onChange={this.onChangeHandler}
              placeholder=" "
            />
            <Input
              s={6}
              error={this.state.errors_edit.last_name}
              id="last_name_input"
              label="Last Name"
              validate
              required
              value={this.state.user.last_name}
              onChange={this.onChangeHandler}
              placeholder=" "
            />
            <Input
              s={12}
              error={this.state.errors_edit.nickname}
              id="nickname_input"
              label="Nickname"
              validate
              required
              value={this.state.user.nickname}
              onChange={this.onChangeHandler}
              placeholder=" "
            />
            <Input
              s={12}
              id="location_input"
              label="Location"
              validate
              required
              value={this.state.user.location}
              onChange={this.onChangeHandler}
              placeholder=" "
            />
            <Input
              s={6}
              id="new_password_input"
              label="New password"
              type="password"
              onChange={this.onChangeHandler}
            />
            <Input
              s={6}
              error={this.state.errors_edit.password}
              id="repeat_password_input"
              label="Repeat password"
              type="password"
              validate
              onChange={this.onChangeHandler}
            />
            <Input id="image" type='file' />
          </Row>
          <Row>
            <Col s={6}>
              <Button waves='light' onClick={this.UpdateClick}>Save</Button>
            </Col>
            <Col className="right-align" s={6}>
              <Link
                className="waves-effect waves-light btn"
                to={"/profile/" + sessionStorage['User-id']}>
                Back
              </Link>
            </Col>
          </Row>
        </div>
      );
    };
}

export default ProfileEdit;
