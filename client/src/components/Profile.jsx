import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import { server_url } from '../config.json';


export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            user: []
        };

        this.renderAvatarImage = this.renderAvatarImage.bind(this);
        this.UpdateClick = this.UpdateClick.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleClick_Main = this.handleClick_Main.bind(this);
        this.handleClick_Edit = this.handleClick_Edit.bind(this);
    }

    componentDidMount() {
        fetch(server_url + '/profile/' + window.location.href.split("/").pop())
        .then(response => response.json())
        .then(json => {
            this.setState({ user: json });
        })

    }

    UpdateClick(eve) {
        eve.preventDefault()
        if (this.state.new_password !== null) {
          if (this.state.new_password === this.state.repeat_password) {
            const data = {
                "email": this.state.email_profile,
                "first_name": this.state.f_name,
                "last_name": this.state.l_name,
                "nickname": this.state.nickname,
                "location": this.state.location,
                "password": this.state.new_password,
                "id": this.state.user.id
            }
            fetch(server_url + '/profile/' + window.location.href.split("/").pop(), {
                method: 'PUT',
                headers: {'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000'},
                body: JSON.stringify(data)
            })
            window.Materialize.toast("Profile Updated", 2500);
          }
          else {
            window.Materialize.toast("Incorrect repeated password!", 2500);
          }
        }
    }

    onChangeHandler = (e) => {
        let { id } = e.currentTarget
        this.setState({ [id]: e.currentTarget.value })
    }

    handleClick_Main() {
        this.setState({ edit: false });

    }
    handleClick_Edit() {
        this.setState({ edit: true });
    }

    renderAvatarImage() {
       if (this.state.user.avatar == null) {
          return (
            <img src="http://dialpharma.com/media/img/default_profile.png" alt="Default icon" />
          );
      }
      else {
         return (
           <img src={this.state.user.avatar} alt="Avatar icon" />
         );
       }
   }


  render() {
      if (this.state.edit === false) {
          return (
            <div>
              <div>
                <h1>Profile</h1>
              </div>
                <div id="main">
                <Row>
                    <Col s={6}>
                        <Row>
                            <this.renderAvatarImage />
                        </Row>
                    </Col>
                    <Col s={2}>
                        <Row s={1}><h4>Nickname:</h4></Row>
                        <Row s={1}><h4>Email:</h4></Row>
                        <Row s={1}><h4>First Name: </h4></Row>
                        <Row s={1}><h4>Last Name: </h4></Row>
                        <Row s={1}><h4>Location: </h4></Row>
                    </Col>
                    <Col s={3}>
                        <Row s={1}><h4>{this.state.user.nickname}</h4></Row>
                        <Row s={1}><h4>{this.state.user.email}</h4></Row>
                        <Row s={1}><h4>{this.state.user.first_name}</h4></Row>
                        <Row s={1}><h4>{this.state.user.last_name}</h4></Row>
                        <Row s={1}><h4>{this.state.user.location}</h4></Row>
                        <Row s={1}><Button waves='light' onClick={this.handleClick_Edit}>Edit</Button></Row>
                    </Col>
                </Row>
                <br />
              </div>
            </div>
        );
      }
      else {
          return (
            <div>
              <div>
                <h1>Profile</h1>
              </div>
                <Row>
                    <Input s={12} id="email_profile" label="Email" placeholder={this.state.user.email} onChange={this.onChangeHandler} />
                    <Input s={6} id="f_name" label="First Name" placeholder={this.state.user.first_name} onChange={this.onChangeHandler} />
                    <Input s={6} id="l_name" label="Last Name" placeholder={this.state.user.last_name} onChange={this.onChangeHandler} />
                    <Input s={12} id="nickname" label="Nickname" placeholder={this.state.user.nickname} onChange={this.onChangeHandler} />
                    <Input s={12} id="location" label="Location" placeholder={this.state.user.location} onChange={this.onChangeHandler} />
                    <Input s={6} id="new_password" label="New password" type="password" onChange={this.onChangeHandler} />
                    <Input s={6} id="repeat_password" label="Repeat password" type="password" onChange={this.onChangeHandler} />
                    <Input id="image" type='file' />
                    <br />
                    <Button waves='light' onClick={this.UpdateClick}>Save</Button>
                    <Button waves='light' onClick={this.handleClick_Main}>Back</Button>
              </Row>
            </div>
      );
      }
  }
}
