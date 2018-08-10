import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import { server_url } from '../config.json';
import Fade from '@material-ui/core/Fade'


export default class ProfilePage extends Component {
    timer = null;

    constructor(props) {
        super(props);

        this.state = {
            wait_please: false,
            Change: false,
            msg: '',
            user: [],
            // input_email: '',
            // input_f_name: '',
            // input_l_name: '',
            // input_nick: '',
            // input_loc: '',
            // input_pass: '',
            input_image: null
        };

        this.UpdateClick = this.UpdateClick.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleClick_Main = this.handleClick_Main.bind(this);
        this.handleClick_Edit = this.handleClick_Edit.bind(this);
    }

    componentDidMount() {
        fetch(server_url + '/profile/' + window.location.href.split("/").pop())
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({ user: json });
        })
        this.timeoutHandle = setTimeout(()=>{
        this.setState({ wait_please: true })}, 10);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    UpdateClick(eve) {
        eve.preventDefault()
        if (this.state.new_password !== null) {
          if (this.state.new_password === this.state.repeat_password) {
            const data = {
                "email": this.state.email,
                "first_name": this.state.f_name,
                "last_name": this.state.l_name,
                "nickname": this.state.nickname,
                "location": this.state.location,
                "password": this.state.new_password,
                "id": this.state.user.id
            }
            console.log(data)
            fetch(server_url + '/profile/' + window.location.href.split("/").pop(), {
                method: 'PUT',
                headers: {'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*'},
                body: JSON.stringify(data)
            })
            console.log("Success");
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
        console.log('Handler [Main] Success!');
        window.location.reload();
    }
    handleClick_Edit() {
        console.log('Handler [Edit] Success!');
        this.setState({Change: true});
        console.log(this.state.Change);
    }

  render() {
      let avatar_image;
      if (this.state.user.avatar == null) {
          avatar_image = <img src="http://dialpharma.com/media/img/default_profile.png" alt="Default icon" />
      }
      else {
          avatar_image = <img src={this.state.user.avatar} alt="Avatar icon" />
      }
      let page
      if (this.state.Change === false) {
          page = <div id="main" style={{marginTop: '2em', float: 'right'}}>
            <Row>
                <Col style={{marginRight: '20em', marginLeft: '2em'}}>
                    <Row>
                          {avatar_image}
                    </Row>
                </Col>
                <Col style={{marginRight: '10em'}}>
                    <Row s={1}><h4>Nickname:</h4></Row>
                    <Row s={1}><h4>Email:</h4></Row>
                    <Row s={1}><h4>First Name: </h4></Row>
                    <Row s={1}><h4>Last Name: </h4></Row>
                    <Row s={1}><h4>Location: </h4></Row>
                </Col>
                <Col style={{marginRight: '10em'}}>
                    <Row s={1}><h4>{this.state.user.nickname}</h4></Row>
                    <Row s={1}><h4>{this.state.user.email}</h4></Row>
                    <Row s={1}><h4>{this.state.user.first_name}</h4></Row>
                    <Row s={1}><h4>{this.state.user.last_name}</h4></Row>
                    <Row s={1}><h4>{this.state.user.location}</h4></Row>
                    <Row s={1}><Button waves='light' onClick={this.handleClick_Edit}>Edit</Button></Row>
                </Col>
            </Row>
            <br />
          </div>;
      }
      else if (this.state.Change === true) {
          page = <Row style={{marginTop: '5em'}}>
              <Input s={12} id="email" label="Email" placeholder={this.state.user.email} onChange={this.onChangeHandler} />
              <Input s={6} id="f_name" label="First Name" placeholder={this.state.user.first_name} onChange={this.onChangeHandler} />
              <Input s={6} id="l_name" label="Last Name" placeholder={this.state.user.last_name} onChange={this.onChangeHandler} />
              <Input s={12} id="nickname" label="Nickname" placeholder={this.state.user.nickname} onChange={this.onChangeHandler} />
              <Input s={12} id="location" label="Location" placeholder={this.state.user.location} onChange={this.onChangeHandler} />
              <Input s={6} id="new_password" label="New password" type="password" onChange={this.onChangeHandler} />
              <Input s={6} id="repeat_password" label="Repeat password" type="password" onChange={this.onChangeHandler} />
              <Button waves='light'><span>Upload image</span><input id="image" style={{display: 'none'}} type='file' /></Button>
              <br />
              <Button waves='light' style={{marginTop: '2em', float: 'left'}} onClick={this.UpdateClick}>Save</Button>
              <Button waves='light' style={{marginTop: '2em', float: 'right'}} onClick={this.handleClick_Main}>Back</Button>
        </Row>;
      }
    return (
    <Fade in={this.state.wait_please}>
      <div style={{marginLeft: '10em', marginRight: '10em'}}>
        <div style={{marginLeft: '5em'}}>
          <h1>Profile</h1>
        </div>
        <ColoredLine color="teal" />
        {page}
      </div>
  </Fade>
    );
  }
}

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
);
