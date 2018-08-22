import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize'
import { request } from '../utils'
import { Link } from 'react-router-dom'


class ProfileEdit extends Component {

    state = {
        user_edit: {},
        error_nick: "",
        error_repeated: "",
        error_first: "",
        error_last: "",
    }

    componentDidMount() {
        request('/profile/' + this.props.match.params.profile_id)
        .then(json => {
            this.setState({user_edit: json});
            this.setState({
                user_edit: {
                    f_name: this.state.user_edit.first_name,
                    l_name: this.state.user_edit.last_name,
                    nick: this.state.user_edit.nickname,
                    loc: this.state.user_edit.location,
                    pass: this.state.user_edit.password
                }
            })
        })
    }

    UpdateClick = (eve) => {
        eve.preventDefault()

        let msg_for_repeated = ""

        this.setState({ error_nick: "" })
        this.setState({ error_first: "" })
        this.setState({ error_last: "" })
        this.setState({ error_repeated: ""})

        if (this.state.new_password === this.state.repeat_password) {
            const data = {
                "first_name": this.state.f_name,
                "last_name": this.state.l_name,
                "nickname": this.state.nickname,
                "location": this.state.location,
                "password": this.state.new_password,
                "id": this.state.user_edit.id
            }
            request('/profile/' + this.props.match.params.profile_id, "PUT", JSON.stringify(data))
            .then(data => {
                try {
                    if ('errors' in data) {
                        for (let i = 0; i < data['errors'].length; i++) {
                            if (data.errors[i].name === "first_name") {
                                this.setState({
                                    error_first: data.errors[i].description
                                })
                            }
                            if (data.errors[i].name === "last_name") {
                                this.setState({
                                    error_last: data.errors[i].description
                                })
                            }
                            if (data.errors[i].name === "nickname") {
                                this.setState({
                                    error_nick: data.errors[i].description
                                })
                            }
                        };
                    }
                    else {
                        this.setState({ error_nick: "" })
                        this.setState({ error_repeated: ""})
                        this.setState({ error_first: ""})
                        this.setState({ error_last: ""})
                        this.props.history.push('/profile/' + this.props.match.params.profile_id);
                        window.Materialize.toast("Profile Updated", 2500);
                    }
                }
                catch (err) {
                    this.setState({ error_nick: "" })
                    this.setState({ error_repeated: ""})
                    this.setState({ error_first: ""})
                    this.setState({ error_last: ""})
                    this.props.history.push('/profile/' + this.props.match.params.profile_id);
                    window.Materialize.toast("Profile Updated", 2500);
                    window.Materialize.toast(err, 2500);
                }
            })
        }
        else {
            msg_for_repeated = "Incorrect repeated password"
        }
        this.setState({ error_repeated: msg_for_repeated })
    };

    onChangeHandler = (e) => {
        let { id } = e.currentTarget
        this.setState({ [id]: e.currentTarget.value })
    }

    render() {
      return (
        <div>
          <div>
             <h1 >Profile</h1>
          </div>
          <Row>
            <Input
              s={6}
              error={this.state.error_first}
              id="f_name"
              label="First Name"
              validate value={this.state.user_edit.first_name}
              onChange={this.onChangeHandler}
              placeholder=" "
            />
            <Input
              s={6}
              error={this.state.error_last}
              id="l_name"
              label="Last Name"
              validate value={this.state.user_edit.last_name}
              onChange={this.onChangeHandler}
              placeholder=" "
            />
            <Input
              s={12}
              error={this.state.error_nick}
              id="nickname"
              label="Nickname"
              validate value={this.state.user_edit.nickname}
              onChange={this.onChangeHandler}
              placeholder=" "
            />
            <Input
              s={12}
              id="location"
              label="Location"
              validate value={this.state.user_edit.location}
              onChange={this.onChangeHandler}
              placeholder=" "
            />
            <Input
              s={6}
              id="new_password"
              label="New password"
              type="password"
              onChange={this.onChangeHandler}
            />
            <Input
              s={6}
              error={this.state.error_repeated}
              id="repeat_password"
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