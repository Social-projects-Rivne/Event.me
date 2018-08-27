import React, { Component } from 'react';
import { Navbar, Parallax, Row, Col, Icon, Tabs, Tab, Input, Button } from 'react-materialize';
import { NavLink, Link } from 'react-router-dom';
import LogIn from './LogIn';
import Registration from './Registration';
import NavProfile from '../Nav/NavProfile';
import LogOut from '../Nav/LogOut';
import { isLogged } from '../../utils';


class Home extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        window.addEventListener('user-log', (e) => this.update());
    }

  update() {
    this.forceUpdate();
  }

  renderNavRecover() {
    return (
      <React.Fragment>
        {
        <li>
          <Link to={"/recover"}>forgot password?</Link>
        </li>
        }
      </React.Fragment>
    );
  }




  renderNotLogined() {
    if (!isLogged()) {
      return (
      <React.Fragment>
      <Col className="left-align"  s={9}>
      <Tabs className="tabs tabs-fixed-width tab-demo z-depth-1">
      <Tab title="Sign In" active><LogIn update={this.update} /></Tab>
      <Tab title="Sign Up"><Registration /></Tab>
      </Tabs></Col>
      </React.Fragment>
      );
    }
  }

  render() {
    return (
    <React.Fragment>
    <Row>
    <div id="home_background" className="parallax-container">
        <Row>
        </Row>
        <div id="parent">
            <div className="white left">
                <h1>Oleh Vinnik Forever</h1>
            </div>
           <div className="right">
               {this.renderNotLogined()}
           </div>
        </div>

    </div>
    </Row>
    </React.Fragment>
    );
  }
}

export default Home;
