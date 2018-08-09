import React, { Component } from 'react';
import { Row, Col, Button } from 'react-materialize'
import { Link } from 'react-router-dom'
import { isLogged } from '../utils'

class Home extends Component {
  componentDidMount(){
    window.addEventListener('user-log', (e) => this.forceUpdate());
  }

  render(){
    return (
      <React.Fragment>
        <Row>
          <Col s={4} offset="s2"><h1>This is Home</h1></Col>
        </Row>
        {
          isLogged() ?
            <Link to="/add-event">
              <Button floating fab='vertical' icon='add' className='red' large style={{bottom: '45px', right: '24px'}}>
              </Button>
            </Link>
            : null
        }
      </React.Fragment>
    );
  }
}

export default Home;
