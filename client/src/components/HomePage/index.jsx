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

  render() {
    return (
    <React.Fragment>
    <Row>
    <div id="home_background" className="parallax-container">
        <Row>
        </Row>
        <div id="parent">
            <div className="grey lighten-1 left">
                <h1>Oleh Vinnik Forever</h1>
            </div>
           <div className="right">
               <Col className="left-align"  s={9}>
               <Tabs className="tabs tabs-fixed-width tab-demo z-depth-1">
               <Tab title="Log In" active><LogIn update={this.update} /></Tab>
               <Tab title="Registration"><Registration /></Tab>
               </Tabs></Col>
           </div>
        </div>

    </div>
    </Row>
    </React.Fragment>
    );
  }
}

export default Home;
